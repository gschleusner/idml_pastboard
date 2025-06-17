// InDesign ExtendScript: Move pasteboard items to new pages, save, and export PDF

// Prompt user to select folder
var folder = Folder.selectDialog("Select the folder with InDesign files");
if (!folder) {
    alert("No folder selected. Script cancelled.");
    exit();
}

var files = folder.getFiles("*.indd");
if (files.length === 0) {
    alert("No InDesign files found in the selected folder.");
    exit();
}

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var doc = app.open(file);

    // Collect all pasteboard items
    var pasteboardItems = [];
    for (var j = 0; j < doc.spreads.length; j++) {
        var spread = doc.spreads[j];
        for (var k = 0; k < spread.pageItems.length; k++) {
            var item = spread.pageItems[k];
            if (!item.parentPage) { // Not on a page = on pasteboard
                pasteboardItems.push(item);
            }
        }
    }

    // Move each pasteboard item to a new page at the end
    for (var m = 0; m < pasteboardItems.length; m++) {
        var newPage = doc.pages.add(LocationOptions.AT_END);
        var pbItem = pasteboardItems[m];
        // Move to center of new page
        var pageBounds = newPage.bounds; // [y1, x1, y2, x2]
        var pbBounds = pbItem.geometricBounds;
        var xOffset = (pageBounds[1] + pageBounds[3]) / 2 - (pbBounds[1] + pbBounds[3]) / 2;
        var yOffset = (pageBounds[0] + pageBounds[2]) / 2 - (pbBounds[0] + pbBounds[2]) / 2;
        pbItem.move([pbItem.geometricBounds[1] + xOffset, pbItem.geometricBounds[0] + yOffset]);
        pbItem.move(newPage);
    }

    // Save as new file
    var newName = file.name.replace(/\.indd$/i, "_pasteboard.indd");
    var newFile = new File(file.path + "/" + newName);
    doc.save(newFile);

    // Export PDF
    var pdfName = file.name.replace(/\.indd$/i, "_pasteboard.pdf");
    var pdfFile = new File(file.path + "/" + pdfName);
    doc.exportFile(ExportFormat.PDF_TYPE, pdfFile);

    doc.close(SaveOptions.NO);
}

alert("Done! All files processed."); 