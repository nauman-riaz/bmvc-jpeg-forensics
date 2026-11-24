window.BmvcNarration = {
  "title": {
    "source": "BMVC manuscript, title, author list and affiliations.",
    "steps": [
      "I’m Nauman Riaz. Let me start with a receipt."
    ]
  },
  "motivation": {
    "source": "DocTamper (Qu et al., CVPR 2023), img7_compression_98.png from the local images/imgs and boxes exports. The original annotation outlines a digit in the number above the item description.",
    "steps": [
      "One digit on this receipt was changed. Can you spot it? [Pause on the unmarked receipt.]",
      "It’s this nine. Think about what a reviewer needs here. If we say there’s an edit somewhere, they still have to search the page. We want to show them where to look. How could that nine have got there?"
    ]
  },
  "forgery-types": {
    "source": "BMVC manuscript Methodology, unified forgery operator and GAF variants. The source-to-target constructions on screen are schematic.",
    "steps": [
      "Imagine changing this total from eighty-two ninety to forty-eight fifty. You could copy forty-eight fifty from an item on the same receipt.",
      "You could paste it from another receipt. That’s splicing.",
      "Or you could render those characters. In every case the reviewer sees the same number. The detector sees this as an image, and how that image was saved can leave traces of its own."
    ]
  },
  "jpeg-scope": {
    "source": "Google ML Kit document scanner supports JPEG and PDF output: https://developers.google.com/ml-kit/vision/doc-scanner/android . WhatsApp documents compression for shared photos: https://faq.whatsapp.com/453914586839706/ . JPEG Committee on adoption in digital imaging: https://jpeg.org/items/20230603_JPEG_100.html . Receipt excerpt from ADCD-Net Supplementary Figure B.",
    "steps": [
      "Think of a receipt someone photographs and sends for review. A camera or scanning app can save it as JPEG. When the photo is shared through an app like WhatsApp, it may be compressed again. JPEG is a common route by which document images reach a detector, and compression leaves structure in the image. Here’s an example of what current methods can do."
    ]
  },
  "current-detectors": {
    "source": "Wong et al., ADCD-Net: Robust Document Image Forgery Localization via Adaptive DCT Feature and Hierarchical Content Disentanglement, ICCV 2025. Supplementary Figure B, first Test row, panels Image, GT, DTD, ADCD-Net. Source: https://openaccess.thecvf.com/content/ICCV2025/supplemental/Wong_ADCD-Net_Robust_Document_ICCV_2025_supplemental.pdf . Original published overlays are preserved. Red marks forged or predicted-forged pixels; blue marks pristine or predicted-pristine pixels. This selected qualitative example illustrates capability, not universal accuracy or a ranking. DTD also flags some authentic pixels.",
    "steps": [
      "Here’s another receipt. The date and time each have an edited digit. The red regions show exactly where they are.",
      "Both detectors pick up those tiny edits. Alongside the appearance of the text, JPEG-aware models can use the patterns that compression leaves behind. How much does the detector’s answer depend on where those blocks happen to fall?"
    ]
  },
  "jpeg-grid": {
    "source": "BMVC manuscript JPEG Compression Model and Experimental Setup. Grid and overlays are schematic. The study evaluates six detectors that use RGB and DCT features.",
    "steps": [
      "Imagine the JPEG grid as the boundaries between eight-by-eight blocks. The shaded region contains the pasted text. On the left, the block pattern in that patch is offset from the one around it. On the right, those boundaries line up. The text is still forged, and the mismatch that might give it away can be weaker. Can a detector still find it?"
    ]
  },
  "gaf": {
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      "Let’s build the edit. Both branches select the same source and target text. We want to copy forty-eight fifty over eighty-two ninety. These selected regions are away from existing annotated forgeries. First, look at the ordinary boxes around the text.",
      "Now reveal the JPEG grid. Each cell represents eight by eight pixels. The source and target boxes cut through these blocks at different positions. A patch copied between them can carry a grid that does not line up with its new surroundings.",
      "For GAF, expand both boxes outward to the nearest block boundaries. [Pause while the boxes expand.] We change the patch boundaries, not the characters. The unaligned control on the left keeps its original boxes.",
      "Now copy the patch in each branch. Watch the source grid move with the text. [Pause until both patches arrive.] On the left, the pasted grid is misaligned with the target. On the right, the block boundaries line up. We apply the same forgery operation and JPEG quality sequence to both. The principle also applies to splicing and rendered text. Let’s see what an aligned edit does to the detector’s prediction."
    ]
  },
  "gaf-results": {
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      "Here is Figure 1 from our paper. Both red and blue regions are forged. Red marks grid-aligned edits; blue marks standard edits. Look at the lower red region and the blue word just beneath it.",
      "Now reveal the prediction in green. The detector flags “one-line” but misses the aligned edit just above it. [Pause on the dashed outline.] The forged content is present, yet the detector leaves it unmarked. That is one example. To test whether this pattern extends across models, we compare matched aligned and unaligned edits throughout the dataset."
    ]
  },
  "gaf-comparison": {
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF.",
    "steps": [
      "Each row is a different detector. The circle is the standard paired edit. The square is the aligned one. On DocTamper, every square moves left, with drops of eight point six to forty-seven percentage points. We see the same direction on Tampered-SROIE. We’ve seen a real edit become harder to find when its grid lines up. Now keep the edit where it is and move the grid. Where will the detector tell us to look?"
    ]
  },
  "prc": {
    "source": "BMVC Algorithm 2 and Experimental Setup. PRC uses edge replication, a fixed (4,4) offset, and no extra recompression after cropping.",
    "steps": [
      "Pad–Recompress–Crop starts from an already forged image. The control on the left recompresses it on its original canvas. Watch the text and the block boundaries on the right as we change the canvas around it.",
      "First, pad four pixels at the top and left. We fill the padding by replicating the edge pixels. Four pixels is half the width of a JPEG block.",
      "Next, recompress using the same JPEG quality sequence as the control. JPEG starts its grid from the new padded corner. The block boundaries now group the text pixels differently.",
      "Finally, crop away the padding before inference. The document returns to its original dimensions and layout. The compression traces reflect the shifted grid. We use this fixed offset for every image and detector. Let’s look at what the same detector marks before and after the shift."
    ]
  },
  "prc-results": {
    "source": "BMVC Figure 1(b), matched predictions on a pre-forged document. The manuscript caption leaves the detector unnamed. The semantic content and spatial layout are preserved, but decoded RGB values may differ after recompression.",
    "steps": [
      "This is the prediction with the original grid. Look at the lines around the two green regions.",
      "After the shift, those same lines light up. The existing edit stays in place. The model is asking the reviewer to investigate authentic text. How much does the response vary across the six models?"
    ]
  },
  "prc-comparison": {
    "source": "Active main-table.tex TestingSet rows, original-forgery recompression control versus PRC pixel F1 for all six detectors. PRC lowers F1 for CAT-Net, DTD, DocForgeNet, FFDN and RTM; ADCD-Net increases from 80.6% to 84.5%. This is a different matched control from the GAF copy–move comparison. Active main-table.tex TestingSet PRC mean FPA ranges from 0.1% to 21.5% of full image area across the detector-level means.",
    "steps": [
      "Five detectors lose pixel-level F1. One improves. The spread is especially visible if we measure false-positive area. Some detectors flag a very small share of the page, while the largest mean reaches twenty-one point five percent of the whole image. The two experiments reveal complementary errors. A real edit can go unmarked when its grid lines up. Authentic text can attract a false alarm when the grid shifts."
    ]
  },
  "thank-you": {
    "source": "The opening receipt from DocTamper returns as a callback to the task. The comparison results come from the reported GAF and PRC experiments. Conclusion and limitations are discussed in the BMVC manuscript.",
    "steps": [
      "Back to the digit we started with. If this same page comes in after a different JPEG save, the reviewer still needs us to point to the same edit. These two experiments give us a way to test whether a detector will.",
      "Thank you. I’m happy to take questions."
    ]
  }
};
