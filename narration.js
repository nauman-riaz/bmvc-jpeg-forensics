window.BmvcNarration = {
  "title": {
    "source": "BMVC manuscript, title, author list and affiliations.",
    "steps": [
      [
        "Good morning, my name is Nauman Riaz.",
        "Today I’ll present my paper, “Mistaking Periodicity for Manipulation: JPEG-Induced Structural Bias in Document Tampering Detection.”",
        "Point to the receipt. One digit was changed."
      ]
    ]
  },
  "motivation": {
    "source": "DocTamper (Qu et al., CVPR 2023), img7_compression_98.png from the local images/imgs and boxes exports. The original annotation outlines a digit in the number above the item description.",
    "steps": [
      [
        "Ask “Can you spot the edit?”",
        "Advance to show the answer."
      ],
      [
        "Point to the outlined 9 above the item description.",
        "The reviewer needs the exact digit. That’s the localization task.",
        "How could someone replace that digit?"
      ]
    ]
  },
  "forgery-types": {
    "source": "BMVC manuscript Methodology, unified forgery operator and GAF variants. The source-to-target constructions on screen are schematic.",
    "steps": [
      [
        "Follow the total changing from 82.90 to 48.50.",
        "Copy–move — copy 48.50 from Item A on this receipt."
      ],
      [
        "Splicing — same replacement amount, this time from a different receipt."
      ],
      [
        "Generated text — draw fresh digits with a text renderer.",
        "Same visible total, three ways to make it. What clues survive when the page is saved?"
      ]
    ]
  },
  "jpeg-scope": {
    "source": "Google ML Kit document scanner supports JPEG and PDF output: https://developers.google.com/ml-kit/vision/doc-scanner/android . WhatsApp documents compression for shared photos: https://faq.whatsapp.com/453914586839706/ . JPEG Committee on adoption in digital imaging: https://jpeg.org/items/20230603_JPEG_100.html . Receipt excerpt from ADCD-Net Supplementary Figure B.",
    "steps": [
      [
        "Capture — a phone or scanner can save the page as JPEG.",
        "Share — sending a photo through WhatsApp may compress it again.",
        "Review — the detector receives the page with traces of those saves."
      ]
    ]
  },
  "current-detectors": {
    "source": "Wong et al., ADCD-Net: Robust Document Image Forgery Localization via Adaptive DCT Feature and Hierarchical Content Disentanglement, ICCV 2025. Supplementary Figure B, first Test row, panels Image, GT, DTD, ADCD-Net. Source: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Wong_ADCD-Net_Robust_Document_ICCV_2025_supplemental.pdf . Original published overlays are preserved. Red marks forged or predicted-forged pixels; blue marks pristine or predicted-pristine pixels. This selected qualitative example illustrates capability, not universal accuracy or a ranking. DTD also flags some authentic pixels.",
    "steps": [
      [
        "Published example from Wong and colleagues.",
        "Point to the date and time. One digit was changed in each."
      ],
      [
        "DTD and ADCD-Net both found the two digits. DTD also flagged some genuine pixels.",
        "Which clue helped? Open up DTD to show what it can see."
      ]
    ]
  },
  "detector-design": {
    "source": "DTD architecture adapted from Qu et al., Towards Robust Tampered Text Detection in Document Image, CVPR 2023, Figure 4 and §4.2. The diagram groups the encoder and decoder into feature fusion and mask prediction. The receipt is the same published example from Wong et al., ICCV 2025 supplementary Figure B. ADCD-Net also models RGB and DCT features. The six detectors and their input modalities are described in the BMVC paper’s Experimental Setup.",
    "steps": [
      [
        "Trace DTD’s two inputs — image pixels on top, JPEG coefficients and quantization table below.",
        "Both branches feed the prediction. All six detectors we studied use pixel and JPEG information.",
        "Our question — how much does grid alignment affect their predictions?"
      ]
    ]
  },
  "jpeg-blocks": {
    "source": "BMVC manuscript, JPEG Compression Model. This is an illustrative 8 × 8 grid drawn on the displayed receipt excerpt from Wong et al., ICCV 2025 supplementary Figure B. The highlighted cell illustrates one block crossing a digit edge. The diagram does not recover the JPEG grid origin of the source file.",
    "steps": [
      [
        "Point to the receipt date. JPEG splits the image into 8 × 8 pixel blocks.",
        "Zoom in on the block that crosses the edge of a digit."
      ],
      [
        "DCT — describe the 64 brightness values as a mix of broad changes and fine detail.",
        "Quantization — round the coefficients to a set of levels.",
        "Repeat block by block. That’s where the 8 × 8 grid comes from."
      ]
    ]
  },
  "jpeg-grid": {
    "source": "BMVC manuscript, JPEG Compression Model and Experimental Setup. Both illustrations show the same pasted amount and use the same highlight. The offset is enlarged for legibility. Predictions are introduced with the GAF results.",
    "steps": [
      [
        "Same pasted amount on both sides. A copied patch can carry its old block pattern.",
        "Trace the red line down to the top of each patch."
      ],
      [
        "Left — the line picks up farther right inside the patch. Right — it continues straight through.",
        "Both are forgeries. Would a detector find them equally well?"
      ]
    ]
  },
  "gaf": {
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      [
        "Grid-Aligned Forgery (GAF). Start with a DocTamper page that already contains an edit.",
        "Add a fresh edit elsewhere, two ways. Follow 48.50 replacing 82.90."
      ],
      [
        "Point to the source and target boxes. They start at different positions within their blocks."
      ],
      [
        "Right — expand both boxes to the surrounding block boundaries.",
        "Left — keep the original boxes as the control."
      ],
      [
        "Follow the copied patch. Its grid lines up on the right.",
        "Same text, same destination, same JPEG saves. Compare the predictions."
      ]
    ]
  },
  "gaf-results": {
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      [
        "One document, two kinds of edit. Red = aligned. Blue = standard.",
        "Find “one-line” near the bottom and the aligned edit just above it."
      ],
      [
        "Green prediction — “one-line” found, word in the dashed box missed.",
        "Does this pattern hold across all six detectors?"
      ]
    ]
  },
  "gaf-comparison": {
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF. The TestingSet CAT-Net DFR is 0.230 for unaligned copy–move and 0.570 for GAF-CM. The GAF-S and GAF-G results are discussed in the paper’s quantitative analysis.",
    "steps": [
      [
        "Pixel-level F1 balances finding edited pixels with avoiding false alarms.",
        "One row per detector. Circle = unaligned. Square = aligned.",
        "Copy–move on DocTamper — all six lose 8.6–47 percentage points. Same direction on Tampered-SROIE."
      ],
      [
        "CAT-Net’s detection failure rate rises from 0.23 to 0.57. More predictions have too little overlap with the edit.",
        "Splicing showed a similar pattern. Rendered text was generally less affected.",
        "Turn the experiment around — keep the edit in place and move the grid."
      ]
    ]
  },
  "prc": {
    "source": "BMVC Algorithm 2 and Experimental Setup. PRC uses edge replication, a fixed (4,4) offset, and no extra recompression after cropping.",
    "steps": [
      [
        "Pad–Recompress–Crop (PRC). Same already-edited page in both versions.",
        "Baseline on the left — recompress on the original grid."
      ],
      [
        "Pad the top and left by four pixels. Repeat the edge pixels.",
        "Four pixels = half a JPEG block."
      ],
      [
        "Recompress at the same JPEG settings as the baseline.",
        "Point to the new top-left corner. Different pixels now share a block."
      ],
      [
        "Crop away the padding. Original words, edit location, and page size.",
        "The block pattern stays shifted. Same four-pixel shift for every detector."
      ]
    ]
  },
  "prc-results": {
    "source": "Figure 1(b) shows the same unnamed detector before and after PRC. Figure 4 is a separate DocTamper TestingSet example, using the image, corresponding ground truth and DTD column from the same bottom row of prc_comparison_seed_123.png. Figure 4 uses red for ground truth, blue for true positives and yellow for false positives.",
    "steps": [
      [
        "Original grid — the detector flags two words in green."
      ],
      [
        "Shifted grid — same page and detector, several more lines flagged.",
        "Next example has ground truth, so we can identify false alarms."
      ],
      [
        "Second page — only the two red regions were edited.",
        "DTD output — blue = correctly flagged pixels. Yellow = genuine text flagged as forged."
      ]
    ]
  },
  "prc-comparison": {
    "source": "BMVC paper, Table 1, DocTamper TestingSet. The DocTamper Original control and PRC use matching recompression schedules on the same pre-forged pages. Pixel F1 declines for five detectors by 7.8 to 67.9 percentage points. ADCD-Net gains 3.9 points. DTD’s PRC false-positive area is 0.177, calculated per image using the full image area and averaged across the test set.",
    "steps": [
      [
        "Same chart key. Circle = original grid. Square = shifted grid.",
        "Five of six lose 7.8–67.9 F1 percentage points on DocTamper.",
        "Exception — ADCD-Net gains 3.9 points."
      ],
      [
        "Recall DTD’s yellow overlay. How much of the page did it flag by mistake?",
        "17.7% of the whole page on average after the shift."
      ]
    ]
  },
  "conclusion": {
    "source": "BMVC paper, Figure 1(a–b), Table 1, Conclusions and Limitations. The left image is a crop of the GAF prediction with the missed aligned edit outlined. The right image is a crop of the PRC prediction on the shifted grid. False alarms are quantified using the annotated test pages. Both probes construct their test inputs without querying the detector. The evaluation covers six JPEG-aware RGB+DCT models.",
    "steps": [
      [
        "GAF — align a forged word with the grid and a detector can miss it.",
        "PRC — shift the grid and a detector can flag genuine words.",
        "Both tests use matched pages and require no detector queries. Sensitivity varies by model."
      ]
    ]
  },
  "thank-you": {
    "source": "The opening receipt shows one changed digit. The example of a detector circling it is hypothetical. PRC tests how shifting the JPEG grid affects predictions on the same edited page.",
    "steps": [
      [
        "Back to the opening receipt and the changed 9.",
        "Imagine a detector circled it. What made it point there?",
        "Same text, different grid, different prediction.",
        "Thank the audience."
      ]
    ]
  }
};
