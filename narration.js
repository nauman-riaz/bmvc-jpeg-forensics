window.BmvcNarration = {
  "title": {
    "time": "0:00–0:10",
    "source": "BMVC manuscript, title and author list. Cover image from DocForgeNet Figure 1.",
    "steps": [
      "I’m Nauman Riaz. Our paper asks how reliably document detectors find edits when the JPEG grid changes."
    ]
  },
  "motivation": {
    "time": "0:10–0:50",
    "source": "DocForgeNet Figure 1, matching restaurant receipt and ground-truth annotation (real2.png and gt2.png).",
    "steps": [
      "A changed amount on a receipt can change what someone pays. But looking for that change is not always easy. Take this real dataset example. Where would you ask a reviewer to look? [Pause on the unmarked receipt.]",
      "The annotation marks the total. This is the localization task: find the altered pixels so a reviewer can inspect the right place. To understand what a detector might use, let’s first look at how replacement text gets into a document."
    ]
  },
  "forgery-types": {
    "time": "0:50–1:25",
    "source": "BMVC manuscript Methodology, unified forgery operator and GAF variants. The source-to-target constructions on screen are schematic.",
    "steps": [
      "There are three constructions in our study. Copy–move takes text from another field on the same page. Here, a value from an item is pasted into the total.",
      "Splicing brings the replacement from a different document. The source changes, but there is still a patch being inserted at the target.",
      "The third construction renders new text. All three constructions can leave traces beyond the visible characters. Modern detectors use those traces to localize the edits. Let’s first see what they can already do."
    ]
  },
  "current-detectors": {
    "time": "1:25–2:05",
    "source": "Wong et al., ADCD-Net: Robust Document Image Forgery Localization via Adaptive DCT Feature and Hierarchical Content Disentanglement, ICCV 2025. Supplementary Figure B, first Test row, panels Image, GT, DTD, ADCD-Net. Source: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Wong_ADCD-Net_Robust_Document_ICCV_2025_supplemental.pdf . Original published overlays are preserved. Red marks forged or predicted-forged pixels; blue marks pristine or predicted-pristine pixels. This selected qualitative example illustrates capability, not universal accuracy or a ranking. DTD also flags some authentic pixels.",
    "steps": [
      "Existing detectors can find very small changes. This published DocTamper receipt contains edits to the date and time. The annotation marks two altered digits in red. The surrounding authentic pixels are blue. These are difficult changes to spot just by reading the receipt.",
      "The published predictions locate the edited digits. This is useful localization of very small changes. The models we study combine visual information with clues left by JPEG compression. Before examining their reliability, let’s make that image setting clear."
    ]
  },
  "jpeg-scope": {
    "time": "2:05–2:40",
    "source": "JPEG Committee, 100th JPEG Meeting Celebration Announcement (3 June 2023): https://jpeg.org/items/20230603_JPEG_100.html . Google ML Kit document scanner supports JPEG and PDF scan outputs: https://developers.google.com/ml-kit/vision/doc-scanner/android . These support widespread digital-imaging use and concrete JPEG document-scanning workflows, not a measured majority share of all document acquisition. BMVC Experimental Setup specifies six JPEG-based RGB+DCT detectors. The illustration repeats the preceding ADCD-Net supplementary Figure B document panel.",
    "steps": [
      "Our focus is document images that have been JPEG compressed. JPEG is widely used for storing and sharing photographs, and mobile document scanners also offer JPEG output. So compression can be part of a document image’s processing history.",
      "The six detectors we study combine two kinds of evidence: RGB features describe the visual appearance, while DCT features describe frequency information from JPEG compression. What does that compression leave behind, and why could a detector depend on it?"
    ]
  },
  "jpeg-grid": {
    "time": "2:40–3:30",
    "source": "BMVC manuscript JPEG Compression Model and Experimental Setup. Document crop from Figure 1(b); the block overlays and phase diagrams are schematic.",
    "steps": [
      "JPEG processes the image in eight-by-eight pixel blocks. Each block is transformed and quantized independently. That can leave a regular pattern of compression traces across the document.",
      "A pasted patch may carry a grid from its earlier compression. If that grid does not line up with the destination, the mismatch is a useful clue. When the boundaries line up, that particular clue becomes weaker, even though the content was changed.",
      "This gives us two controlled tests. First, align the edit and ask whether it is missed: Grid-Aligned Forgery, or GAF. Then shift the grid and ask whether predictions change: Pad–Recompress–Crop, or PRC. We’ll follow the aligned edit first."
    ]
  },
  "gaf": {
    "time": "3:30–4:45",
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      "Let’s build the edit. Both branches select the same source and target text. We want to copy forty-eight fifty over eighty-two ninety. These selected regions are away from existing annotated forgeries. First, look at the ordinary boxes around the text.",
      "Now reveal the JPEG grid. Each cell represents eight by eight pixels. The source and target boxes cut through these blocks at different positions. A patch copied between them can carry a grid that does not line up with its new surroundings.",
      "For GAF, expand both boxes outward to the nearest block boundaries. [Pause while the boxes expand.] We change the patch boundaries, not the characters. The unaligned control on the left keeps its original boxes.",
      "Now copy the patch in each branch. Watch the source grid move with the text. [Pause until both patches arrive.] On the left, the pasted grid is misaligned with the target. On the right, the block boundaries line up. We apply the same forgery operation and JPEG quality sequence to both. The principle also applies to splicing and rendered text. Let’s see what an aligned edit does to the detector’s prediction."
    ]
  },
  "gaf-results": {
    "time": "4:45–5:30",
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      "Here is Figure 1 from our paper. Both red and blue regions are forged. Red marks grid-aligned edits; blue marks standard edits. Look at the lower red region and the blue word just beneath it.",
      "Now reveal the prediction in green. The detector flags “one-line” but misses the aligned edit just above it. [Pause on the dashed outline.] The forged content is present, yet the detector leaves it unmarked. That is one example. To test whether this pattern extends across models, we compare matched aligned and unaligned edits throughout the dataset."
    ]
  },
  "gaf-comparison": {
    "time": "5:30–6:25",
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF.",
    "steps": [
      "Here are the six detectors on DocTamper. Hollow circles mark the paired unaligned edits; filled circles mark GAF. Every detector loses pixel F1, by eight point six to forty-seven percentage points. The edit operation and JPEG schedule are matched, so this comparison targets alignment. The effect varies across models and forgery types; rendered edits generally show smaller losses.",
      "The pattern also transfers to Tampered-SROIE receipts: all six DocTamper-trained detectors lose F1 under aligned copy–move. So preserving the grid can hide a forgery across different models and data. Now reverse the question: can changing the grid make authentic text look forged?"
    ]
  },
  "prediction": {
    "time": "6:25–7:00",
    "source": "BMVC Figure 1(b), matched predictions on a pre-forged document. The manuscript caption leaves the detector unnamed. The semantic content and spatial layout are preserved, but decoded RGB values may differ after recompression.",
    "steps": [
      "This page already contains a forgery. On the left is the prediction after recompression on the original grid. Green marks the pixels the detector flags.",
      "Now shift the grid during recompression. The text and layout stay in place, yet the prediction spreads across the page. [Pause.] We created no new edit here. To see how we shift the grid while preserving the layout, follow these three operations."
    ]
  },
  "prc": {
    "time": "7:00–8:10",
    "source": "BMVC Algorithm 2 and Experimental Setup. PRC uses edge replication, a fixed (4,4) offset, and no extra recompression after cropping.",
    "steps": [
      "Pad–Recompress–Crop starts from an already forged image. The control on the left recompresses it on its original canvas. Watch the text and the block boundaries on the right as we change the canvas around it.",
      "First, pad four pixels at the top and left. We fill the padding by replicating the edge pixels. Four pixels is half the width of a JPEG block.",
      "Next, recompress using the same JPEG quality sequence as the control. JPEG starts its grid from the new padded corner. The block boundaries now group the text pixels differently.",
      "Finally, crop away the padding before inference. The document returns to its original dimensions and layout, but the compression traces reflect the shifted grid. We use this fixed offset for every image and detector, without querying the detector. Let’s separate the real edited region from the extra pixels it flags."
    ]
  },
  "prc-results": {
    "time": "8:10–9:20",
    "source": "BMVC PRC qualitative comparison (prc_comparison_seed_123.png), TestingSet example; the illustrative output is from DocForgeNet. Active main-table.tex PRC rows give mean FPA values of 1.1%, 17.7%, 21.5%, 0.1%, 0.2%, and 0.3% for the six detectors. The displayed range is across detector-level means, not across individual images.",
    "steps": [
      "Here is another DocTamper example showing the false-alarm failure mode. Start with the ground truth. The outline marks the actual edited region. Everything beyond that annotation should remain unflagged.",
      "Now add the prediction after PRC. The correctly flagged pixels cover the edit, but the false positives spread over authentic text. [Pause on the overlay.] Finding the edit is only part of the task. A useful detector must also avoid sending a reviewer to many places that were never changed.",
      "We measure that extra coverage with false-positive area. For each image, we count flagged pixels outside the annotation and divide by the full image area. Across the six evaluated detectors, the mean coverage after PRC ranges from zero point one to twenty-one point five percent. So this severe example is not equally representative of every model. The amount of false-positive coverage varies substantially. How does PRC affect their overall localization scores?"
    ]
  },
  "prc-comparison": {
    "time": "9:20–10:10",
    "source": "Active main-table.tex TestingSet rows, original-forgery recompression control versus PRC pixel F1 for all six detectors. PRC lowers F1 for CAT-Net, DTD, DocForgeNet, FFDN and RTM; ADCD-Net increases from 80.6% to 84.5%. This is a different matched control from the GAF copy–move comparison.",
    "steps": [
      "For PRC, the control is the existing dataset forgery recompressed on its original grid. The filled markers show the same forgery after the grid shift. Five of six detectors lose F1. Two drop sharply, while others change less, and one improves on this split. [Pause on the different responses.] Grid sensitivity therefore does not mean every architecture fails in the same way. Together with the false-positive overlays, these results show why reliability needs both tests: can an aligned edit escape detection, and can a shifted grid produce false alarms?"
    ]
  },
  "takeaway": {
    "time": "10:10–11:00",
    "source": "BMVC manuscript Conclusions and Limitations. Results concern the tested JPEG-based RGB+DCT detectors and processing conditions. GAF may change edit boundaries slightly; PRC recompression may change decoded RGB values.",
    "steps": [
      "We began by asking whether a detector finds the pixels that were changed. Aligning an edit with JPEG blocks can make it miss those pixels. Shifting the grid around an existing edit can make it flag authentic text. Strong benchmark scores can coexist with both kinds of sensitivity.",
      "These are controlled probes, with limits: snapping can slightly expand an edit, and recompression can change decoded pixel values. Within the tested JPEG pipelines, the practical lesson is to evaluate both missed edits and false alarms under grid changes. That gives us a more informative picture of reliability than benchmark F1 alone."
    ]
  },
  "thank-you": {
    "time": "11:00–11:15",
    "source": "The closing pair reprises the missed aligned region from BMVC Figure 1(a) and the PRC qualitative example. Discussion links return to the corresponding slides and appendix.",
    "steps": [
      "Thank you. I’m happy to take questions."
    ]
  }
};
