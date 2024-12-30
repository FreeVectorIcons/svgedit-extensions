# ext-codemirror

This extension integrates CodeMirror editor into SVG-Edit, providing syntax-highlighted source code editing capabilities for SVG content.

## Features

- Real-time SVG source code editing
- Syntax highlighting
- Automatic synchronization between code changes and canvas view
- Integration within SVG-Edit

## Installation

To install, copy the `ext-codemirror folder to SVG-Edit's extensions directory. A more robust extension installation mechanism will be provided in the future.

## Usage

1. The CodeMirror editor panel appears in the left panel of SVG-Edit
2. Any changes made in the code editor are automatically reflected in the canvas
3. When elements are selected in the canvas, the source code view updates accordingly

## API

The extension exposes a global `extCodeMirror` object with the following methods:

```
window.extCodeMirror = {
    getValue: () => string, // Returns the current code editor value
    setValue: (code: string) => void // Updates the code editor content
    streamSVG: (svg: string) => void // Streams SVG content to the code editor
}
```

## Dependencies

- CodeMirror editor (bundled as `CodeEditor.bundle.js`)
- SVG-Edit core

## Design

See [DESIGN.MD](DESIGN.MD)

## Author

Hemanta Sapkota <hemanta@yolmo.com> 