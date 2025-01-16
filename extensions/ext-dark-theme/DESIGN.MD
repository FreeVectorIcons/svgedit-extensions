# ext-dark-theme

## Overview

The dark theme extension provides a seamless way to switch between light and dark themes in SVG-Edit. This extension enhances user experience by offering a visually appealing and customizable interface, especially in low-light environments.

![image](https://github.com/user-attachments/assets/16415026-34df-4712-bd03-57e4d27c2159)

```mermaid
stateDiagram-v2
    [*] --> Init: Extension Load
    
    Init --> StylesheetLoaded: Create and Append\nStylesheet Link
    note right of Init
        Creates link element
        Sets href to dark theme CSS
        Sets ID for tracking
    end note
    
    StylesheetLoaded --> ButtonCreated: Create Toggle Button
    note right of StylesheetLoaded
        Button added to tools_top
        with theme.svg icon
    end note
    
    state ThemeStates {
        LightTheme --> DarkTheme: Click Toggle\n(disabled = false)
        DarkTheme --> LightTheme: Click Toggle\n(disabled = true)
    }
    
    ButtonCreated --> LightTheme: Initial State\n(stylesheet disabled)

    note right of ThemeStates
        Theme toggling handled by
        enabling/disabling stylesheet
    end note
```


## Features

- Easy toggle between light and dark themes
- Seamless integration with SVG-Edit

## Preview

https://github.com/user-attachments/assets/43ae9699-4e20-4fa4-accf-a4207552f2e8

## Author

Hemanta Sapkota <hemanta@yolmo.com> 