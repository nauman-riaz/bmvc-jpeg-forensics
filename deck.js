(() => {
  const byId = id => document.getElementById(id);
  const slides = [...document.querySelectorAll(".slides > section")];
  const receiver = new URLSearchParams(location.search).has("receiver");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const quiet = reducedMotion || receiver;
  document.documentElement.classList.toggle("presenter-receiver", receiver);
  const progress = document.querySelector(".reading-progress span");

  function fragmentGroups(slide, visibleOnly = false) {
    const fragments = slide.querySelectorAll(visibleOnly ? ".fragment.visible" : ".fragment");
    return new Set([...fragments].map(fragment => fragment.dataset.fragmentIndex));
  }

  function addNarration(slide, index) {
    const { source, steps } = window.BmvcNarration[slide.id];
    if (steps.length !== fragmentGroups(slide).size + 1) {
      throw new Error("Speaker notes are missing a reveal on " + slide.id);
    }
    const notes = document.createElement("aside");
    notes.className = "notes";
    notes.hidden = true;
    steps.forEach((speech, step) => {
      const passage = document.createElement("div");
      passage.dataset.noteStep = String(step);
      const label = document.createElement("p");
      label.className = "note-position";
      label.textContent = "Slide " + (index + 1) + " · " + slide.dataset.location +
        (steps.length > 1 ? " · Step " + step + "/" + (steps.length - 1) : "");
      const body = document.createElement("p");
      body.className = "note-speech";
      body.textContent = speech;
      const references = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Source and figure context";
      const description = document.createElement("p");
      description.textContent = source;
      references.append(summary, description);
      passage.append(label, body, references);
      notes.append(passage);
    });
    slide.append(notes);
  }

  slides.forEach((slide, index) => {
    slide.dataset.backgroundColor ||= "#f3f0e8";
    slide.dataset.step = "0";
    addNarration(slide, index);
    const folio = document.createElement("span");
    folio.className = "slide-folio";
    folio.textContent = String(index + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    slide.append(folio);
  });

  function scoreCell(baseline, treatment) {
    const cell = document.createElement("div");
    cell.className = "score-cell";
    cell.setAttribute("role", "cell");

    const track = document.createElement("span");
    track.className = "score-track";
    track.setAttribute("aria-hidden", "true");
    const distance = document.createElement("span");
    distance.className = "score-distance";
    distance.style.left = Math.min(baseline, treatment) + "%";
    distance.style.width = Math.abs(baseline - treatment) + "%";
    track.append(distance);
    for (const [value, style] of [[baseline, ""], [treatment, " treatment"]]) {
      const point = document.createElement("span");
      point.className = "score-point" + style;
      point.style.left = value + "%";
      track.append(point);
    }

    const values = document.createElement("span");
    values.className = "score-values";
    values.append(baseline.toFixed(1) + "% to ");
    const after = document.createElement("strong");
    after.textContent = treatment.toFixed(1) + "%";
    values.append(after);
    cell.append(track, values);
    return cell;
  }

  const { models, doc } = window.BmvcResults;
  for (const [branch, controlOffset, interventionOffset] of [["gaf", 2, 3], ["prc", 0, 1]]) {
    const scoreRows = byId(branch + "-model-scores");
    for (const [index, model] of models.entries()) {
      const control = doc[index * 8 + controlOffset][2] * 100;
      const intervention = doc[index * 8 + interventionOffset][2] * 100;
      const row = document.createElement("div");
      row.className = "score-row";
      row.setAttribute("role", "row");
      const name = document.createElement("span");
      name.className = "score-model";
      name.setAttribute("role", "rowheader");
      name.textContent = model;
      row.append(name, scoreCell(control, intervention));
      scoreRows.append(row);
    }
  }

  const notes = ColloquiumStepNotes.createController(slides);
  function normalizeLegacySlideLink() {
    const [requestedSlide, requestedStep] = location.hash.replace(/^#\/?/, "").split("/");
    if (requestedSlide === "prediction") {
      history.replaceState(null, "", requestedStep === "0" ? "#/prc-results/0" : "#/prc-results/-1");
    } else if (requestedSlide === "takeaway") {
      history.replaceState(null, "", "#/thank-you/-1");
    }
  }
  normalizeLegacySlideLink();
  window.addEventListener("hashchange", normalizeLegacySlideLink);
  const deck = new Reveal({
    width: 1440, height: 810, margin: 0, center: false,
    controls: false, progress: false, slideNumber: false,
    hash: true, fragmentInURL: true, history: false,
    transition: quiet ? "none" : "fade",
    transitionSpeed: "fast",
    backgroundTransition: quiet ? "none" : "fade",
    autoAnimate: !quiet,
    autoAnimateDuration: 0.65,
    autoAnimateEasing: "cubic-bezier(.22,.75,.2,1)",
    autoAnimateUnmatched: true,
    // Animate each image and its annotation layers as one unit. Matching its image and parent as
    // well would multiply their transforms and separate image/mask layers.
    autoAnimateMatcher: (fromSlide, toSlide) =>
      [...fromSlide.querySelectorAll("[data-morph]")].flatMap(from => {
        const to = [...toSlide.querySelectorAll("[data-morph]")]
          .find(candidate => candidate.dataset.morph === from.dataset.morph);
        return to ? [{ from, to, options: { measure: element => element.getBoundingClientRect() } }] : [];
      }),
    autoSlide: 0, showNotes: false, scrollActivationWidth: false,
    keyboard: receiver ? false : { 35: goToClosing, 79: () => deck.toggleOverview(), 83: openPresenter },
  });
  ColloquiumAudience.bind(deck);

  function goTo(id, complete = false) {
    const target = byId(id);
    const index = slides.indexOf(target);
    if (index < 0) return;
    if (deck.isOverview()) deck.toggleOverview(false);
    deck.slide(index, 0, complete ? fragmentGroups(target).size - 1 : -1);
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }

  function goToClosing() {
    goTo("thank-you", true);
  }

  function openPresenter() {
    if (location.protocol === "file:") {
      alert("To open the presenter window, serve this folder locally and reopen the deck over HTTP. See the BMVC README for the command.");
      return;
    }
    ColloquiumPresenter.open();
  }

  function synchronize() {
    const slide = deck.getCurrentSlide();
    if (!slide) return;
    const index = deck.getIndices().h;
    const count = slides.length;
    const steps = fragmentGroups(slide).size;
    const step = fragmentGroups(slide, true).size;
    slide.dataset.step = String(step);
    notes.show(slide, step);
    const stateLabel = slide.querySelector(".state-message");
    if (slide.id === "gaf") {
      stateLabel.textContent = ["Source and target text regions selected", "JPEG block grid revealed",
        "GAF source and target expanded to block boundaries", "Copy complete: the GAF grid stays aligned"][step];
    }
    if (slide.id === "prc") {
      stateLabel.textContent = ["Original block alignment", "Four pixels added on two sides",
        "JPEG grid anchored at the padded corner", "Half-block shift after cropping"][step];
    }
    byId("chapter-location").textContent = slide.dataset.location;
    byId("step-count").textContent = (index + 1) + " / " + count + (steps ? " · " + step + "/" + steps : "");
    progress.style.width = Math.min(100, (index + step / (steps + 1)) / (count - 1) * 100) + "%";
    byId("previous-button").disabled = index === 0 && step === 0;
    byId("next-button").disabled = index === count - 1 && step === steps;
  }

  for (const event of ["ready", "slidechanged", "fragmentshown", "fragmenthidden"]) {
    deck.on(event, synchronize);
  }
  if (location.protocol !== "file:") {
    ColloquiumPresenter.create({ deck, closing: goToClosing });
  } else {
    byId("notes-button").addEventListener("click", openPresenter);
    byId("start-presenting-button").addEventListener("click", () => ColloquiumAudience.setClean(true));
  }

  byId("previous-button").addEventListener("click", () => deck.prev());
  byId("next-button").addEventListener("click", () => deck.next());
  byId("closing-button").addEventListener("click", goToClosing);
  for (const link of document.querySelectorAll("[data-go]")) {
    link.addEventListener("click", event => {
      event.preventDefault();
      goTo(link.dataset.go, true);
    });
  }

  const help = byId("help-dialog");
  byId("help-button").addEventListener("click", () => help.showModal());
  byId("close-help").addEventListener("click", () => help.close());
  document.addEventListener("keydown", event => {
    if (event.key === "?" && !help.open && !receiver) help.showModal();
  });
  deck.initialize();
})();

