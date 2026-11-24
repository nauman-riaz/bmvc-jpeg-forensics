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
      "Stay with this receipt. Look at its date and time. Someone changed one digit in each. The annotation shows how small those edits are.",
      "Both detectors found the changed digits. DTD also flagged a few extra pixels. What information did these detectors have that we didn’t? Let’s look inside one of them."
    ]
  },
  "detector-design": {
    "source": "DTD architecture adapted from Qu et al., Towards Robust Tampered Text Detection in Document Image, CVPR 2023, Figure 4 and §4.2. The diagram groups the encoder and decoder into feature fusion and mask prediction. The receipt is the same published example from Wong et al., ICCV 2025 supplementary Figure B. ADCD-Net also models RGB and DCT features. The six detectors and their input modalities are described in the BMVC paper’s Experimental Setup.",
    "steps": [
      "Take DTD. One branch sees the receipt just as we do. The other reads information from the way the receipt was saved. All six detectors we studied use both kinds of information. To see what that second branch has to work with, let’s look at how JPEG stores the date on this receipt."
    ]
  },
  "jpeg-blocks": {
    "source": "BMVC manuscript, JPEG Compression Model. This is an illustrative 8 × 8 grid drawn on the displayed receipt excerpt from Wong et al., ICCV 2025 supplementary Figure B. The highlighted cell illustrates one block crossing a digit edge. The diagram does not recover the JPEG grid origin of the source file.",
    "steps": [
      "JPEG starts by dividing the image into little squares, eight pixels across and eight pixels down. Let’s zoom in on the date and look at one of those squares. [Advance to zoom.]",
      "Those squares form the JPEG grid. See where the dark ink meets the light paper inside the highlighted square? JPEG takes the brightness values of those 64 pixels and describes them with a set of numbers. Some describe broad changes in brightness. Others describe fine detail, like the edge of this digit. That calculation is called the discrete cosine transform, or DCT. JPEG then rounds those numbers so it can store them compactly. That rounding step is called quantization. The thing to remember is that JPEG does this separately for each square. Now imagine copying a piece of text from one part of the receipt to another."
    ]
  },
  "jpeg-grid": {
    "source": "BMVC manuscript, JPEG Compression Model and Experimental Setup. Both illustrations show the same pasted amount and use the same highlight. The offset is enlarged for legibility. Predictions are introduced with the GAF results.",
    "steps": [
      "Here’s our pasted amount, forty-eight fifty. It can carry traces of the JPEG blocks from where it came from. Watch the red line where the patch meets the page. [Advance to reveal the line inside each patch.]",
      "On the left, the line reaches the patch, and the next boundary picks up over here. [Point to the offset.] On the right, it carries straight through. Both amounts were pasted. Would a detector find them equally well? [Pause.] That’s what we set out to test."
    ]
  },
  "gaf": {
    "source": "BMVC Algorithm 1 and Experimental Setup. Animation adapted from the colloquium GAF slide. The schematic uses 32 screen units per 8-pixel block. Control copy translation is (8,184) screen units; snapped translation is (32,192), preserving grid phase. The target text remains underneath the opaque moving patch until it is covered. Each Snap8 boundary expands by fewer than eight actual pixels.",
    "steps": [
      "We started with DocTamper pages that already contained an annotated edit. In a separate region we made two versions of one new edit. Both use the same source text and target text. Here we copy forty-eight fifty over eighty-two ninety.",
      "Lay the grid over the two selected boxes. Look at where the source box starts inside a block, then where the target box starts.",
      "For Grid-Aligned Forgery, expand the source and target boxes to the enclosing block boundaries. [Pause as the boxes expand.] The selected words stay the same. The control keeps its original boxes.",
      "Now copy the patch in both versions. [Let both patches land.] We use the same copy operation and JPEG quality sequence in each. The intended difference is where the patch boundaries fall. How does the detector respond on a real document?"
    ]
  },
  "gaf-results": {
    "source": "BMVC Figure 1(a), att1_bag_gt_overlay.png and att1_bag_pred_overlay.png. The figure does not identify the detector. It shows distinct grid-aligned and standard edited regions within one document, not a before/after pair of the same edit. Across all six detectors, active main-table.tex TestingSet rows give paired copy–move pixel F1 decreases of 8.6–47.0 percentage points.",
    "steps": [
      "We have moved from the schematic pair to one document containing both kinds of edit. This is its ground truth. Find the blue word “one-line” near the bottom and the red region immediately above it. Both were edited. Which one will the detector mark? [Pause.]",
      "Here is its prediction in green. It finds “one-line.” The dashed box shows where the aligned edit above it went unmarked. That answers the question for one example. Does the same pattern hold across detectors?"
    ]
  },
  "gaf-comparison": {
    "source": "Active main-table.tex TestingSet rows: paired copy–move pixel F1 for all six detectors. Hollow markers are the matched unaligned controls and filled markers are GAF. Losses range from 8.6 to 47.0 percentage points. Active tsroie-table.tex shows lower paired copy–move F1 for all six DocTamper-trained detectors on Tampered-SROIE. The control and intervention use the same source and target text, forgery operation and JPEG schedule, with Snap8 applied only in GAF. The TestingSet CAT-Net DFR is 0.230 for unaligned copy–move and 0.570 for GAF-CM. The GAF-S and GAF-G results are discussed in the paper’s quantitative analysis.",
    "steps": [
      "Each row is one detector. Read across from the open circle, the unaligned control, to the red square, the aligned copy–move. All six lose pixel-level F1 on DocTamper, by 8.6 to 47 percentage points. All six also lose F1 on Tampered-SROIE copy–move.",
      "Do these shifts mean real misses? Detection failure rate counts predictions with too little overlap with the annotation, averaged over several overlap thresholds. For CAT-Net it rose from 0.23 to 0.57. Returning to the other edits we showed at the start, splicing followed a similar pattern. Rendered text was generally less affected, with considerable variation across detectors. Now turn the question around. What happens if we leave an existing edit in place and move the JPEG grid?"
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
    "source": "Figure 1(b) shows the same unnamed detector before and after PRC. Figure 4 is a separate DocTamper TestingSet example, using the image, corresponding ground truth and DTD column from the same bottom row of prc_comparison_seed_123.png. Figure 4 uses red for ground truth, blue for true positives and yellow for false positives.",
    "steps": [
      "This is the original grid. Green shows the detector’s prediction. Keep your eye on the lines surrounding the two marked words.",
      "Here is the same detector after the shift. Its prediction now spreads over those lines. To tell which flagged pixels are authentic, we need to compare a prediction with an annotation. The paper gives us that comparison on a second page.",
      "On this second page there are just two small annotated regions. They appear in red in the middle panel. On the right, blue marks pixels DTD correctly localized after PRC. Yellow marks authentic pixels the detector flagged. How much of a page can those false alarms occupy across the six detectors?"
    ]
  },
  "prc-comparison": {
    "source": "Active main-table.tex TestingSet rows, original-forgery recompression control versus PRC pixel F1 for all six detectors. PRC lowers F1 for CAT-Net, DTD, DocForgeNet, FFDN and RTM; ADCD-Net increases from 80.6% to 84.5%. This is a different matched control from the GAF copy–move comparison. Active main-table.tex TestingSet PRC mean FPA ranges from 0.1% to 21.5% of full image area across the detector-level means.",
    "steps": [
      "For each page we count authentic pixels the detector flagged and divide by the area of the whole page. We then average across DocTamper’s test set. Two models reach 17.7 and 21.5 percent. The other four are at or below 1.1 percent. Five of the six also lose pixel F1, and one improves. The response to the fixed half-block shift varies substantially by detector. What does that mean for the reviewer we started with?"
    ]
  },
  "thank-you": {
    "source": "The opening receipt from DocTamper returns as a callback to the task. The comparison results come from the reported GAF and PRC experiments. Conclusion and limitations are discussed in the BMVC manuscript.",
    "steps": [
      "At the start I asked you to find one changed digit. A reviewer needs two things from a detector. Point to that digit, and leave the genuine text alone. Across the six JPEG-aware detectors we tested, grid alignment could affect both judgments. GAF tests whether aligning an edit can hide it. PRC tests whether shifting the grid can create false alarms. We can construct both tests without querying the detector.",
      "Thank you. I’m happy to take questions."
    ]
  }
};
