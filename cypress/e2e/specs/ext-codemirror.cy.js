/// <reference types="cypress" />

describe('ext-codemirror Extension', () => {

  const svgStr = `<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n <g class="layer">\n  <title>Layer 1</title>\n  <circle cx="119" cy="82.5" fill="red" id="svg_1" r="61.5"/>\n </g>\n</svg>`;


  beforeEach(() => {
    // Visit the SVG-Edit editor page before each test
    cy.visit('/src/editor/index.html', { timeout: 50000 })
    cy.wait(3000)
  })

  it('should load the codemirror extension', () => {
    // Check if the code editor panel exists
    cy.get('#codeditorpanel').should('exist')
    cy.get('#codemirror').should('exist')
  })

  it('should mount the view source dialog', async () => {
    // Check if dialog exists and is open
    cy.get('#se-svg-view-source-dialog').should('exist')
  })

  it('should sync SVG content between code editor and canvas', () => {
    cy.window().then((win) => {
      // set value in code editor and update canvas
      win.extCodeMirror.setValue({ value: svgStr, updateSvgCanvas: true })
    }).then((win) => {
      // get svg string from canvas
      expect(win.extCodeMirror.getValue()).to.equal(svgStr)
    })
  })

  it('should stream SVG content to the code editor', () => {
    cy.window().then((win) => {
      win.extCodeMirror.streamSVG({ value: svgStr })
      cy.wait(100) // Add small delay to ensure streaming has started
      expect(win.extCodeMirror.getValue()).to.include('<svg width')
    });
  })
}) 
