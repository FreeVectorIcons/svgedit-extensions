/**
 * @file ext-codemirror-extras.js
 *
 * @license MIT
 *
 * @copyright 2024 Hemanta Sapkota <hemanta@yolmo.com>
 *
 */

/** codemirror-extras. use with ext-codemirror */
import { showViewSourceDialog } from './util.js';

const name = 'codemirror-extras';

export default {
  name,
  async init({ }) {
    const svgEditor = this;
    const { svgCanvas } = svgEditor;
    const { $id, $click } = svgCanvas;

    return {
      name: svgEditor.i18next.t(`${name}:name`),
      callback() {
        const navigationMenu = document.createElement('template');
        navigationMenu.innerHTML = `
        <div style="display:flex; flex-direction: row; align-items: center; padding-bottom: 8px;">
            <se-menu id="Menu" label="Menu" alt="logo">
                <se-menu-item id="to_base64" label="Convert to Base64"></se-menu-item>
                <se-menu-item id="to_stream" label="Stream SVG"></se-menu-item>
            </se-menu>
        </div>
        `;
        $id('codeditorpanel').prepend(navigationMenu.content.cloneNode(true));

        $click($id('to_base64'), function () {
          const svgStr = svgCanvas.getSvgString();
          const sui = svgCanvas.encode64(svgStr);
          showViewSourceDialog(sui);
        });

        $click($id('to_stream'), function () {
          const helloSVG = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="lightblue" />
  <text x="50%" y="50%" font-family="monospace, sans-serif" font-size="20" fill="black" text-anchor="middle" dominant-baseline="middle">
    Hello, SVG!
  </text>
</svg>`;
          window.extCodeMirror.streamSVG({ value: helloSVG });
        });
      },
    };
  },
};
