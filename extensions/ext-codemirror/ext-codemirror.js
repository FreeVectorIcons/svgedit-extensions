/**
 * @file ext-codemirror.js
 *
 * @license MIT
 *
 * @copyright 2024 Hemanta Sapkota <hemanta@yolmo.com>
 *
 */

import { InitCodeEditor, UpdateCodeEditorState } from "./CodeEditor.bundle";
import { streamSVGValue } from "./extensions/codemirror-extras/util.js";

import "./SeSvgViewSourceDialog.js";

const name = "codemirror";

/**
 * Load the appropriate translation module based on the editor's language setting.
 *
 * @param {Object} svgEditor - The SVG editor instance.
 */
const loadExtensionTranslation = async function (svgEditor) {
  let translationModule;
  const lang = svgEditor.configObj.pref("lang");
  try {
    translationModule = await import(`./locale/${lang}.js`);
  } catch (_error) {
    console.warn(`Missing translation (${lang}) for ${name} - using 'en'`);
    translationModule = await import("./locale/en.js");
  }
  svgEditor.i18next.addResourceBundle(lang, name, translationModule.default);
};

export default {
  name,
  async init() {
    const svgEditor = this;
    const { svgCanvas } = svgEditor;
    const { $id } = svgCanvas;
    let codeEditor = undefined;

    await loadExtensionTranslation(svgEditor);

    /**
     * Dynamically load a dependency from the extensions folder.
     *
     * @param {string} extname - The name of the extension to load.
     * @param {Object} svgEditor - The SVG editor instance.
     */
    const loadDependency = async (extname) => {
      try {
        const imported = await import(
          `./extensions/${encodeURIComponent(extname)}/${encodeURIComponent(
            extname
          )}.js`
        );
        const { name = extname, init: initfn } = imported.default;
        return this.addExtension(name, initfn && initfn.bind(this), {
          langParam: "en",
        });
      } catch (err) {
        console.error("Extension failed to load: " + extname + "; ", err);
      }
    };

    // view source dialog
    const seViewSourceDialog = document.createElement(
      "se-svg-view-source-dialog"
    );
    seViewSourceDialog.setAttribute("id", "se-svg-view-source-dialog");
    svgEditor.$container.append(seViewSourceDialog);
    seViewSourceDialog.init(svgEditor.i18next);

    // bind code editor document changed event
    const onDocChanged = (arg0) => {
      svgCanvas.clear();
      const success = svgCanvas.setSvgString(arg0);
      if (success) {
        svgEditor.updateCanvas(false);
        svgEditor.zoomImage();
        svgEditor.layersPanel.populateLayers();
      }
    };

    const onSVGUIChanged = (opts) => {
      if (opts.elems.length === 0) {
        return;
      }
      const svgStr = svgCanvas.getSvgString();
      setValue({ value: svgStr });
    };

    // DOM Api methods
    const getValue = () => window.codeEditor.state.doc.toString();
    const setValue = ({
      value /** svg string */,
      updateSvgCanvas = false /** update canvas for UI tests only */,
    }) => {
      UpdateCodeEditorState({
        editor: codeEditor,
        doc: value,
        onDocChanged,
      });
      if (updateSvgCanvas) {
        onDocChanged(value);
      }
    };
    const streamSVG = ({ value }) => {
      setValue({ value: '' }); // Reset code editor
      streamSVGValue({
        svgContent: value,
        onChunkComplete: () => {},
        onStreamComplete: () => onDocChanged(value),
      });
    };

    return {
      name: svgEditor.i18next.t(`${name}:name`),
      callback() {
        const codeEditorTemplate = document.createElement("template");
        const style = [
          "overflow: scroll",
          "background-color: var(--main-bg-color)",
          "max-width: 50vw",
          "min-width: 50vw",
          "font-family: Verdana, Helvetica, Arial, sans-serif",
          "font-size: 10pt",
          "color: var(--text-color)",
        ].join("; ");
        codeEditorTemplate.innerHTML = `<div id="codeditorpanel" style="${style}"><div id="codemirror"/></div>`;
        $id("container").prepend(codeEditorTemplate.content.cloneNode(true));
        // init code editor
        codeEditor = InitCodeEditor({
          doc: svgCanvas.getSvgString(),
          onDocChanged,
          onSuccess: async () => {
            // Load ext-codemirror-extras module
            loadDependency("codemirror-extras");
            // Expose DOM api when code editor is ready
            window.extCodeMirror = {
              // Streams svg string to code editor just like LLM does
              streamSVG,
              // Gets svg string from code editor
              getValue,
              // Sets svg string to code editor with an option to update canvas. Note, you should only update the canvas for writing UI tests.
              setValue,
            };
          },
        });
      },
      selectedChanged(opts) {
        onSVGUIChanged(opts);
      },
      elementChanged(opts) {
        // todo: update code editor with the new svg string ensuring:
        // 1. code editor caret position is maintained
        // 2. code editor scroll position is maintained
        // 3. code editor selection is maintained
        // 4. code editor scroll position is maintained
        // ❌ onSVGUIChanged(opts) - breaks all of the above
      },
    };
  },
};
