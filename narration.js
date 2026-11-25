window.BmvcNarration = {
  "title": {
    "source": "BMVC manuscript, title, author list and affiliations.",
    "steps": [
      [
        "Good morning, my name is Nauman Riaz.",
        "Mistaking Periodicity for Manipulation: JPEG-Induced Structural Bias in Document Tampering Detection",
        "Begin with altered image",
      ]
    ]
  },
  "motivation": {
    "source": "DocTamper (Qu et al., CVPR 2023), img7_compression_98.png from the local images/imgs and boxes exports. The original annotation outlines a digit in the number above the item description.",
    "steps": [
      [
        "Altered receipt. Can you spot the edit?",
        "One digit altered.",
        "In the interest of time → reveal."
      ],
      [
        "This 9. Subtle, small, Naked eye",
        "Forgery detection.",
        "altering a document could change what a document claims",
        "Important domain, reciepts"
      ]
    ]
  },
  "forgery-types": {
    "source": "BMVC manuscript Methodology, unified forgery operator and GAF variants. The source-to-target constructions on screen are schematic.",
    "steps": [
      [
        "Where could the replacement come from?",
        "Same receipt → copy–move."
      ],
      [
        "Different receipt → splicing."
      ],
      [
        "Generated text → chosen font or AI.",
        "BMVC travel claims joke."
      ]
    ]
  },
  "jpeg-scope": {
    "source": "Google ML Kit document scanner supports JPEG and PDF output: https://developers.google.com/ml-kit/vision/doc-scanner/android . WhatsApp documents compression for shared photos: https://faq.whatsapp.com/453914586839706/ . JPEG Committee on adoption in digital imaging: https://jpeg.org/items/20230603_JPEG_100.html . Receipt excerpt from ADCD-Net Supplementary Figure B.",
    "steps": [
      [
        "Focus → JPEG document images.",
        "Why → one of the main formats for storing images.",
        "Where → websites, social media, scanners, phones."
      ]
    ]
  },
  "current-detectors": {
    "source": "Wong et al., ADCD-Net: Robust Document Image Forgery Localization via Adaptive DCT Feature and Hierarchical Content Disentanglement, ICCV 2025. Supplementary Figure B, first Test row, panels Image, GT, DTD, ADCD-Net. Source: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Wong_ADCD-Net_Robust_Document_ICCV_2025_supplemental.pdf . Original published overlays are preserved. Red marks forged or predicted-forged pixels; blue marks pristine or predicted-pristine pixels. This selected qualitative example illustrates capability, not universal accuracy or a ranking. DTD also flags some authentic pixels.",
    "steps": [
      [
        "How well do current detectors perform?",
        "Receipt + ground truth → two edited 8s, one in the date and one in the time."
      ],
      [
        "DTD and ADCD-Net → both found the two 8s.",
        "Pretty good on this receipt, right? Which cues could they be using?"
      ]
    ]
  },
  "detector-design": {
    "source": "DTD architecture adapted from Qu et al., Towards Robust Tampered Text Detection in Document Image, CVPR 2023, Figure 4 and §4.2. The diagram groups the encoder and decoder into feature fusion and mask prediction. The receipt is the same published example from Wong et al., ICCV 2025 supplementary Figure B. ADCD-Net also models RGB and DCT features. The six detectors and their input modalities are described in the BMVC paper’s Experimental Setup.",
    "steps": [
      [
        "Focus on DTD → two streams.",
        "Visual stream → RGB pixels. Frequency stream → DCT coefficients + quantization table.",
        "Combine both streams → predict which pixels were edited."
      ]
    ]
  },
  "jpeg-blocks": {
    "source": "BMVC manuscript, JPEG Compression Model. This is an illustrative 8 × 8 grid drawn on the displayed receipt excerpt from Wong et al., ICCV 2025 supplementary Figure B. The highlighted cell illustrates one block crossing a digit edge. The diagram does not recover the JPEG grid origin of the source file.",
    "steps": [
      [
        "Quick JPEG refresher → split the image into 8 × 8 pixel blocks."
      ],
      [
        "Within each block → apply the DCT, then quantize the coefficients.",
        "The block boundaries form an implicit grid.",
        "What happens to that grid when someone edits the image?"
      ]
    ]
  },
  "jpeg-grid": {
    "source": "BMVC manuscript, JPEG Compression Model and Experimental Setup. Both illustrations show the same pasted amount and use the same highlight. The offset is enlarged for legibility. Predictions are introduced with the GAF results.",
    "steps": [
      [
        "Paste 48.50 → the patch carries traces of its old grid.",
        "Follow the red line to the edge of the patch."
      ],
      [
        "Left → the line jumps. Right → it lines up.",
        "Both amounts were pasted. Would the detector find both?"
      ]
    ]
  },
  "gaf": {
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      [
        "First test → Grid-Aligned Forgery (GAF).",
        "Same copy–move edit, with and without grid alignment."
      ],
      [
        "Reveal the grid → compare where each text box starts inside its block."
      ],
      [
        "Left → keep the original boxes.",
        "Right → expand both boxes out to the block edges."
      ],
      [
        "Same text, destination and JPEG settings. Only the right-hand paste lines up.",
        "Does the detector still flag it?"
      ]
    ]
  },
  "gaf-results": {
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      [
        "Ground truth → different edits on one real page.",
        "Red = aligned edits. Blue = standard edits."
      ],
      [
        "Green prediction → “one-line” found, aligned word in the dashed box missed.",
        "Is this just one example? Compare all six detectors."
      ]
    ]
  },
  "gaf-comparison": {
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF. The TestingSet CAT-Net DFR is 0.230 for unaligned copy–move and 0.570 for GAF-CM. The GAF-S and GAF-G results are discussed in the paper’s quantitative analysis.",
    "steps": [
      [
        "DocTamper copy–move → circle = unaligned, square = aligned.",
        "All six lose pixel-level F1 → down 8.6–47 percentage points."
      ],
      [
        "CAT-Net → detection failure rate rises from 0.23 to 0.57.",
        "What if we keep the edit in place and shift the grid?"
      ]
    ]
  },
  "prc": {
    "source": "BMVC Algorithm 2 and Experimental Setup. PRC uses edge replication, a fixed (4,4) offset, and no extra recompression after cropping.",
    "steps": [
      [
        "Second test → Pad–Recompress–Crop (PRC).",
        "Same edited page on both sides. Left keeps the original grid."
      ],
      [
        "Pad the top and left → four pixels, half a JPEG block."
      ],
      [
        "Recompress at the same settings → blocks now start at the padded corner."
      ],
      [
        "Crop away the padding → original page size, same words, same edit.",
        "The grid stays shifted. What does the detector flag now?"
      ]
    ]
  },
  "prc-results": {
    "source": "Figure 1(b) shows the same unnamed detector before and after PRC. Figure 4 is a separate DocTamper TestingSet example, using the image, corresponding ground truth and DTD column from the same bottom row of prc_comparison_seed_123.png. Figure 4 uses red for ground truth, blue for true positives and yellow for false positives.",
    "steps": [
      [
        "Original grid → both instances of “that” flagged in green."
      ],
      [
        "Same page and detector → green now spreads across several lines.",
        "Which marks are false alarms? Check the next page’s ground truth."
      ],
      [
        "Second page → only the two red regions were edited.",
        "DTD → blue marks correctly flagged pixels. Yellow marks genuine text flagged as forged."
      ]
    ]
  },
  "prc-comparison": {
    "source": "BMVC paper, Table 1, DocTamper TestingSet. The DocTamper Original control and PRC use matching recompression schedules on the same pre-forged pages. Pixel F1 declines for five detectors by 7.8 to 67.9 percentage points. ADCD-Net gains 3.9 points. DTD’s PRC false-positive area is 0.177, calculated per image using the full image area and averaged across the test set.",
    "steps": [
      [
        "After the shift → five of six lose 7.8–67.9 F1 percentage points.",
        "One exception → ADCD-Net gains 3.9 points."
      ],
      [
        "Recall DTD’s yellow overlay → false alarms cover 17.7% of the whole page on average."
      ]
    ]
  },
  "conclusion": {
    "source": "BMVC paper, Figure 1(a–b), Table 1, Conclusions and Limitations. The left image is a crop of the GAF prediction with the missed aligned edit outlined. The right image is a crop of the PRC prediction on the shifted grid. False alarms are quantified using the annotated test pages. Both probes construct their test inputs without querying the detector. The evaluation covers six JPEG-aware RGB+DCT models. The opening receipt shows one changed digit. The example of a detector circling it is hypothetical.",
    "steps": [
      [
        "GAF → align the edit, and a detector can miss a forged word.",
        "PRC → shift the grid, and it can flag genuine words.",
        "Both tests use matched pages and need no detector queries.",
        "Back to the receipt → imagine a detector circled the 9. What made it point there?",
        "Same words, different grid, different prediction. Thank you."
      ]
    ]
  },
  "thank-you": {
    "source": "Speaker contact details.",
    "steps": [[]]
  }
};
