/**
 * @file ext-dark-theme.js
 *
 * @license MIT
 *
 * @copyright
 * 2024 Hemanta Sapkota, Yolmo® Labs
 *
 */

/**
 * SVG-Edit Extension: Dark Theme
 *
 * This extension adds a toggle button to the SVG-Edit interface, allowing users to switch
 * between the default light theme and a custom dark theme. The dark theme styles are defined
 * in the 'ext-dark-theme.css' file, which is dynamically loaded and applied when the user
 * clicks the toggle button.
 */

const name = 'dark-theme'

/**
 * Loads the appropriate translation module based on the user's language preference.
 * @param {object} svgEditor - The main SVG-Edit editor object.
 */
const loadExtensionTranslation = async function (svgEditor) {
  let translationModule
  const lang = svgEditor.configObj.pref('lang')
  try {
    translationModule = await import(`./locale/${lang}.js`)
  } catch (_error) {
    console.warn(`Missing translation (${lang}) for ${name} - using 'en'`)
    translationModule = await import('./locale/en.js')
  }
  svgEditor.i18next.addResourceBundle(lang, name, translationModule.default)
}

export default {
  name,
  /**
   * Initializes the dark theme extension.
   * @param {object} _importLocale - Placeholder for locale import, if needed.
   */
  async init ({ _importLocale }) {
    const svgEditor = this
    await loadExtensionTranslation(svgEditor)
    const { svgCanvas } = svgEditor
    const { $id, $click } = svgCanvas

    // Load the dark theme CSS file and set an ID for easy toggling
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.id = 'dark-theme-stylesheet'
    link.href = `${svgEditor.configObj.curConfig.extPath}/ext-dark-theme/ext-dark-theme.css`
    document.head.appendChild(link)

    // Create a button template for the theme toggle button
    const buttonTemplate = document.createElement('template')
    const title = `${name}:buttons.0.title`

    buttonTemplate.innerHTML = `
      <se-button id="dark-theme-toggle" title="${title}" src="theme.svg">
      </se-button>
    `

    // Append the toggle button to the left toolbar
    $id('tools_top').append(buttonTemplate.content.cloneNode(true))

    // Add click event to toggle the dark theme on and off
    $click($id('dark-theme-toggle'), () => {
      const stylesheet = document.getElementById('dark-theme-stylesheet')
      stylesheet.disabled = !stylesheet.disabled
    })

    return {
      name: 'Dark Theme'
    }
  }
}
