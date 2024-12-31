# ext-codemirror

This extension integrates the [CodeMirror](https://codemirror.net/) editor into [SVG-Edit](https://github.com/svg-edit) - a popular javascript based vector graphics editor, providing syntax-highlighted source code editing capabilities for SVG content.

![ext-codemirror design](https://github.com/user-attachments/assets/1aa3bccc-9933-4f4f-b3af-3f3ef760387b)


## Features

- Real-time SVG source code editing
- Syntax highlighting
- Automatic synchronization between code changes and canvas view
- Integration within SVG-Edit
- Built-in mechanism to extend the plugin

## API

The extension exposes a global `extCodeMirror` object with the following methods:

```
window.extCodeMirror = {
    getValue: () => string, // Returns the current code editor value
    setValue: ({ value: string }) => void // Updates the code editor content
    streamSVG: ({ value: string }) => void // Streams SVG content to the code editor
}
```

# Preview of `ext-codemirror` 

## 1. CodeMirror Integration

<img width="1624" alt="Screenshot 2024-12-31 at 11 24 48 am" src="https://github.com/user-attachments/assets/59598063-4287-4dcb-a78d-5884f932f355" />

## 2. Automatic synchronization between code and svg canvas view

### 2.1 From Code Editor to SvgCanvas

https://github.com/user-attachments/assets/d61ffc45-f14a-4791-8483-8307004264bd

### 2.2 From SvgCanvas to Code Editor

https://github.com/user-attachments/assets/cafe0ecd-38b5-43e5-ab97-5b4cbf89a4a8

### 2.3 Bi-directional editing

https://github.com/user-attachments/assets/b0c03c8b-41db-4f0e-97de-c619d2ab4876

# Preview of `ext-codemirror-extras` 

The extension itself can be extended via the `ext-codemirror-extras` extension. Built-in examples include a view source dialog and a streaming SVG example.

## 1. Extend the plugin with a UI

https://github.com/user-attachments/assets/147d3182-bdc3-479d-90bb-2ee8699d28d2

## 2. Large Language Model (LLM) style SVG content streaming

https://github.com/user-attachments/assets/a562975d-fb43-4c34-aca7-a9201d53d9b4

## Author

[Hemanta Sapkota](https://github.com/hemantasapkota) | <hemanta@yolmo.com> 