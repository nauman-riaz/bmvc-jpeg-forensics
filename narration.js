window.BmvcNarration = {
  "title": {
    "source": "BMVC manuscript, title, author list and affiliations.",
    "steps": [
      "I’m Nauman Riaz. My colleagues and I study how detectors locate forgeries in document images. Let me start with this receipt. Someone changed one digit."
    ]
  },
  "motivation": {
    "source": "DocTamper (Qu et al., CVPR 2023), img7_compression_98.png from the local images/imgs and boxes exports. The original annotation outlines a digit in the number above the item description.",
    "steps": [
      "Can you spot the edit? [Advance to show the annotation.]",
      "It’s this nine. A reviewer needs to know exactly which digit to check. Our task is to mark those pixels. First, let me show you three ways someone could make a replacement."
    ]
  },
  "forgery-types": {
    "source": "BMVC manuscript Methodology, unified forgery operator and GAF variants. The source-to-target constructions on screen are schematic.",
    "steps": [
      "Suppose this total is eighty-two ninety and we want it to read forty-eight fifty. We could copy that amount from another line on the same receipt. That’s copy–move.",
      "We could take the amount from a different receipt and paste it here. That’s splicing.",
      "Or we could draw the characters ourselves with a text renderer. All three routes can leave the reviewer looking at exactly the same amount. How the image was saved gives us another source of evidence."
    ]
  },
  "jpeg-scope": {
    "source": "Google ML Kit document scanner supports JPEG and PDF output: https://developers.google.com/ml-kit/vision/doc-scanner/android . WhatsApp documents compression for shared photos: https://faq.whatsapp.com/453914586839706/ . JPEG Committee on adoption in digital imaging: https://jpeg.org/items/20230603_JPEG_100.html . Receipt excerpt from ADCD-Net Supplementary Figure B.",
    "steps": [
      "Think of the route a receipt takes to a reviewer. A phone or a scanning app can save it as JPEG. Sharing the photo through an app such as WhatsApp may compress it again. So a detector can receive both the document and traces of its compression history. Here’s what existing detectors can do with a receipt like this one."
    ]
  },
  "current-detectors": {
    "source": "Wong et al., ADCD-Net: Robust Document Image Forgery Localization via Adaptive DCT Feature and Hierarchical Content Disentanglement, ICCV 2025. Supplementary Figure B, first Test row, panels Image, GT, DTD, ADCD-Net. Source: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Wong_ADCD-Net_Robust_Document_ICCV_2025_supplemental.pdf . Original published overlays are preserved. Red marks forged or predicted-forged pixels; blue marks pristine or predicted-pristine pixels. This selected qualitative example illustrates capability, not universal accuracy or a ranking. DTD also flags some authentic pixels.",
    "steps": [
      "Look at the date and time on this receipt. One digit in each was changed. Here they are enlarged so you can see what the annotation covers.",
      "Both detectors find both digits. DTD also flags a few extra pixels. This is a published example from Wong and colleagues. To see what information these models can use, let’s look inside DTD."
    ]
  },
  "detector-design": {
    "source": "DTD architecture adapted from Qu et al., Towards Robust Tampered Text Detection in Document Image, CVPR 2023, Figure 4 and §4.2. The diagram groups the encoder and decoder into feature fusion and mask prediction. The receipt is the same published example from Wong et al., ICCV 2025 supplementary Figure B. ADCD-Net also models RGB and DCT features. The six detectors and their input modalities are described in the BMVC paper’s Experimental Setup.",
    "steps": [
      "One branch of DTD sees the image pixels, just as we do. The other reads numbers that JPEG stored when the receipt was saved. All six detectors we studied use both kinds of information. We can see where those numbers come from by zooming in on the date."
    ]
  },
  "jpeg-blocks": {
    "source": "BMVC manuscript, JPEG Compression Model. This is an illustrative 8 × 8 grid drawn on the displayed receipt excerpt from Wong et al., ICCV 2025 supplementary Figure B. The highlighted cell illustrates one block crossing a digit edge. The diagram does not recover the JPEG grid origin of the source file.",
    "steps": [
      "JPEG divides the image into little squares, eight pixels across and eight pixels down. Here’s one of those squares in the date. [Advance to zoom.]",
      "Those squares form the JPEG grid. Inside the highlighted block, dark ink meets light paper. JPEG takes its 64 brightness values and describes them with a set of numbers. Some capture broad changes in brightness. Others capture fine detail, like the edge of this digit. The calculation is the discrete cosine transform, or DCT. JPEG rounds the resulting numbers to store them compactly. That step is called quantization. It does this separately for each block."
    ]
  },
  "jpeg-grid": {
    "source": "BMVC manuscript, JPEG Compression Model and Experimental Setup. Both illustrations show the same pasted amount and use the same highlight. The offset is enlarged for legibility. Predictions are introduced with the GAF results.",
    "steps": [
      "Now copy forty-eight fifty to a new position. The patch can carry compression traces from its original blocks. Follow the highlighted line down to the edge of each patch.",
      "On the left, the boundary inside the patch picks up farther to the right. On the right, it continues straight through. Both amounts were pasted. We tested whether lining up those boundaries changes how well a detector finds the edit."
    ]
  },
  "gaf": {
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      "We started with DocTamper pages that already contained an annotated forgery. Elsewhere on each page, we made a new edit two ways. Here, both versions copy forty-eight fifty over eighty-two ninety.",
      "Lay the grid over the text boxes. The source and target start at different positions within their blocks.",
      "For Grid-Aligned Forgery, or GAF, we expand both boxes to the enclosing block boundaries. The control keeps its original boxes.",
      "As the patches land, the copied text is the same on both sides. So are the copy operation and the JPEG quality settings. We’ve changed how the patch fits the grid. Here is the prediction on a real document."
    ]
  },
  "gaf-results": {
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      "This page contains both kinds of edit. Blue marks the standard edits and red marks the aligned ones. Look at the word “one-line” near the bottom and the red region just above it. Both were forged.",
      "The prediction is green. It picks up “one-line” and misses the aligned edit in the dashed box. We then measured the effect across all six detectors."
    ]
  },
  "gaf-comparison": {
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF. The TestingSet CAT-Net DFR is 0.230 for unaligned copy–move and 0.570 for GAF-CM. The GAF-S and GAF-G results are discussed in the paper’s quantitative analysis.",
    "steps": [
      "Each row is one detector. Pixel F1 rewards finding the edited pixels and avoiding false alarms. The circle is its score on the matched unaligned edit. The square is its score when we align the edit. Every square moves left. The loss on DocTamper ranges from 8.6 to 47 percentage points. All six also lose F1 on copy–move in a second dataset, Tampered-SROIE.",
      "Detection failure rate tells us how often a prediction overlaps too little with the true edit, averaged over several overlap thresholds. For CAT-Net it rises from 0.23 to 0.57. Splicing showed a similar pattern. Rendered text was generally less affected, with more variation across detectors. For our second experiment, we kept an existing edit in place and moved the grid."
    ]
  },
  "prc": {
    "source": "BMVC Algorithm 2 and Experimental Setup. PRC uses edge replication, a fixed (4,4) offset, and no extra recompression after cropping.",
    "steps": [
      "Here we use pages that are already forged. The control on the left recompresses the page on its original grid. On the right we apply Pad–Recompress–Crop, or PRC.",
      "First, add four pixels at the top and left by repeating the edge pixels. Four pixels is half a JPEG block.",
      "Next, recompress with the same JPEG quality settings as the control. JPEG starts at the new corner, so each block now groups a different set of pixels.",
      "Finally, crop away the padding. The original text, edit location and page dimensions are back in place. The compression traces reflect the shifted grid. We used this same four-pixel shift with every detector."
    ]
  },
  "prc-results": {
    "source": "Figure 1(b) shows the same unnamed detector before and after PRC. Figure 4 is a separate DocTamper TestingSet example, using the image, corresponding ground truth and DTD column from the same bottom row of prc_comparison_seed_123.png. Figure 4 uses red for ground truth, blue for true positives and yellow for false positives.",
    "steps": [
      "This detector flags two words on the original grid. Green shows its prediction.",
      "After the shift, the same detector flags several more lines. To see which marks are false alarms, here’s a second page with its annotation.",
      "Just two small regions are actually edited. They’re red in the middle panel. In DTD’s output on the right, blue marks correctly flagged pixels. All that yellow is genuine content flagged as forged. We measured how well each of the six detectors localizes edits after that shift."
    ]
  },
  "prc-comparison": {
    "source": "BMVC paper, Table 1, DocTamper TestingSet. The DocTamper Original control and PRC use matching recompression schedules on the same pre-forged pages. Pixel F1 declines for five detectors by 7.8 to 67.9 percentage points. ADCD-Net gains 3.9 points. DTD’s PRC false-positive area is 0.177, calculated per image using the full image area and averaged across the test set.",
    "steps": [
      "Read this chart the same way as the GAF chart. Each circle gives pixel F1 on the original grid. Each square gives F1 after the shift. Five detectors lose between about eight and sixty-eight percentage points. ADCD-Net gains about four points.",
      "For DTD, the detector that marked all that text in yellow, we also measured how much of the page it falsely flagged. After PRC, those false alarms covered 17.7 percent of the whole page on average. That helps explain the sharp F1 drop on DTD’s row."
    ]
  },
  "conclusion": {
    "source": "BMVC paper, Figure 1(a–b), Table 1, Conclusions and Limitations. The left image is a crop of the GAF prediction with the missed aligned edit outlined. The right image is a crop of the PRC prediction on the shifted grid. False alarms are quantified using the annotated test pages. Both probes construct their test inputs without querying the detector. The evaluation covers six JPEG-aware RGB+DCT models.",
    "steps": [
      "Across the six detectors, the size of the effect varied, but the grid could change what a reviewer was asked to inspect. On the left, a forged word goes unmarked. On the right, the prediction spreads onto genuine text. GAF and PRC let us test for both errors on matched pages. We can build the test images without querying the detector."
    ]
  },
  "thank-you": {
    "source": "The closing states a practical implication of the BMVC paper’s conclusions. The Q&A appendix contains the complete reported results and metric definitions.",
    "steps": [
      "For someone checking a receipt, a different JPEG save should still lead them to the same edited word. That’s the standard these experiments ask us to test. Thank you. I’d be happy to take questions."
    ]
  }
};
