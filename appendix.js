(() => {
  const closingLink = document.getElementById("appendix-closing");

  function originatingClosingButton() {
    const owner = window.opener;
    if (!owner || owner.closed) return null;
    // A tab that opened the appendix may since have navigated to another site.
    try {
      if (new URL(".", owner.location.href).href !== new URL(".", location.href).href) return null;
      return owner.document.getElementById("closing-button") ||
        (owner.opener && !owner.opener.closed ? owner.document.getElementById("presenter-closing") : null);
    } catch {
      return null;
    }
  }

  closingLink.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const button = originatingClosingButton();
    if (!button) return; // Opening the appendix directly uses the ordinary link.
    event.preventDefault();
    button.ownerDocument.querySelector("dialog[open]")?.close();
    button.click();
    window.opener.focus();
    window.close();
  });
  document.addEventListener("keydown", event => {
    if (event.key.toLowerCase() !== "c" || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.closest("input, textarea, select") || event.target.isContentEditable) return;
    event.preventDefault();
    closingLink.click();
  });

  const { models, doc, ts, wfe } = window.BmvcResults;
  const pct = value => value === null ? "—" : (value * 100).toFixed(1);
  const forgery = ["Copy–move", "Generative", "Splicing"];
  const splits = ["TestingSet", "FCD", "SCD"];

  function renderTable(target, groups, conditions, rows) {
    const frame = document.createElement("div");
    frame.className = "table-wrap";
    const table = document.createElement("table");
    const header = table.createTHead().insertRow();
    for (const [name, span] of groups) {
      const th = document.createElement("th");
      th.colSpan = span;
      th.scope = span === 1 ? "col" : "colgroup";
      th.textContent = name;
      header.append(th);
    }
    if (conditions.length) {
      const subhead = table.tHead.insertRow();
      for (const name of conditions) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = name;
        subhead.append(th);
      }
    }
    const body = table.createTBody();
    for (const [name, ...values] of rows) {
      const row = body.insertRow();
      const title = document.createElement("th");
      title.scope = "row";
      title.textContent = name;
      row.append(title);
      for (const value of values) {
        const cell = row.insertCell();
        if (Array.isArray(value)) {
          const primary = document.createElement("b");
          primary.textContent = pct(value[2]);
          cell.append(pct(value[0]) + " / " + pct(value[1]), document.createElement("br"),
            primary, " / " + pct(value[3]));
        } else cell.textContent = pct(value);
      }
    }
    frame.append(table);
    target.append(frame);
  }

  function resultsSection(id, title, introduction) {
    const section = document.createElement("section");
    section.id = id;
    const heading = document.createElement("h2");
    heading.textContent = title;
    const description = document.createElement("p");
    description.textContent = introduction;
    section.append(heading, description);
    document.getElementById("results-tables").append(section);
    return section;
  }

  for (const [i, split] of splits.entries()) {
    const target = resultsSection(split.toLowerCase(), "DocTamper " + split,
      "Each cell shows precision / recall and F1 / FPA for PRC or F1 / DFR for GAF. All values are percentages.");
    renderTable(target, [["Detector", 1], ["PRC", 2], ...forgery.map(name => [name, 2])],
      ["", "Baseline", "Shifted", "Unaligned", "Aligned", "Unaligned", "Aligned", "Unaligned", "Aligned"],
      models.map((name, m) => [name, ...doc.slice(m * 8, m * 8 + 8).map(row => row.slice(i * 4, i * 4 + 4))]));
  }
  const receipts = resultsSection("receipts", "Tampered-SROIE",
    "Paired GAF results for DocTamper-trained models. Each cell shows precision / recall, then F1 / DFR, as percentages.");
  renderTable(receipts, [["Detector", 1], ...forgery.map(name => [name, 2])],
    ["", "Unaligned", "Aligned", "Unaligned", "Aligned", "Unaligned", "Aligned"],
    models.map((name, m) => [name, ...ts.slice(m * 3, m * 3 + 3).flatMap(row => [row.slice(0, 4), row.slice(4)])]));
  renderTable(document.getElementById("wfe-table"),
    ["Split", "With WFE baseline", "With WFE PRC", "Without WFE baseline", "Without WFE PRC"].map(name => [name, 1]), [],
    splits.map((split, i) => [split, ...wfe.map(row => row[i * 4 + 2])]));
})();
