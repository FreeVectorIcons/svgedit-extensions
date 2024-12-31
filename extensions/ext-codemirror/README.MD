# ext-codemirror

This extension integrates CodeMirror editor into SVG-Edit, providing syntax-highlighted source code editing capabilities for SVG content.

## Features

- Real-time SVG source code editing
- Syntax highlighting
- Automatic synchronization between code changes and canvas view
- Integration within SVG-Edit

## Installation

To install, copy the `ext-codemirror` folder to SVG-Edit's extensions directory.

## Usage

1. The CodeMirror editor panel appears in the left panel of SVG-Edit
2. Any changes made in the code editor are automatically reflected in the canvas
3. When elements are selected in the canvas, the source code view updates accordingly

## API

The extension exposes a global `extCodeMirror` object with the following methods:

```
window.extCodeMirror = {
    getValue: () => string, // Returns the current code editor value
    setValue: ({ value: string }) => void // Updates the code editor content
    streamSVG: ({ value: string }) => void // Streams SVG content to the code editor
}
```

The extension provides additional functionality through the `ext-codemirror-extras` extension. This includes built-in features such as a "Convert to Base64" dialog for converting SVG to base64 encoded string, and a streaming SVG example that demonstrates real-time code updates. Developers can also create their own extras to extend the core CodeMirror functionality.


## Dependencies

- CodeMirror editor (bundled as `CodeEditor.bundle.js`)
- SVG-Edit core

## Author

Hemanta Sapkota <hemanta@yolmo.com> 