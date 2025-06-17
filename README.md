# idml_pastboard
Take information stored in the paste board of a document and make it into real pages so it can be export to other formats.

## Script: move_pasteboard_to_pages.jsx

This InDesign ExtendScript automates the process of moving all pasteboard items (objects outside the document layout) onto new pages, making them printable and exportable.

### What the script does
- Opens all InDesign (.indd) files in a selected folder.
- Finds all objects on the pasteboard (not on any page).
- For each pasteboard item, creates a new page at the end of the document and moves the item onto it.
- Saves the modified document as `[originalname]_pasteboard.indd`.
- Exports a PDF as `[originalname]_pasteboard.pdf`.

### How to use
1. Open Adobe InDesign.
2. Open the Scripts panel (`Window > Utilities > Scripts`).
3. Right-click "User" and choose "Reveal in Finder/Explorer" to open the scripts folder.
4. Copy `move_pasteboard_to_pages.jsx` into this folder.
5. In InDesign, double-click the script in the Scripts panel to run it.
6. Select the folder containing your `.indd` files when prompted.
7. The script will process all files in the folder and alert you when done.

### Notes
- The script uses the default PDF export preset.
- Each pasteboard item is placed on its own new page at the end of the document.
- Original files are not modified; new files are created with `_pasteboard` added to the name.
