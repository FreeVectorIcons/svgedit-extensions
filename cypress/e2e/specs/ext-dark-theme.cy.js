/// <reference types="cypress" />

describe('ext-dark-theme Extension', () => {
  beforeEach(() => {
    // Visit the SVG-Edit editor page before each test
    cy.visit('/src/editor/index.html')
  })

  it('should load the dark theme extension', () => {
    // Check if the dark theme toggle button exists
    cy.get('#dark-theme-toggle').should('exist')
  })

  it('should toggle the dark theme on and off', () => {
    // Initially, the body background should be dark
    cy.get('.svg_editor').should('have.css', 'background-color').and('equal', 'rgb(30, 30, 30)') // #1e1e1e

    // Click the dark theme toggle button
    cy.get('#dark-theme-toggle').click({ force: true })

    // The body background should now be light
    cy.get('.svg_editor').should('have.css', 'background-color').and('equal', 'rgb(114, 121, 122)') // #72797A

    // Click the toggle button again to switch back
    cy.get('#dark-theme-toggle').click({ force: true })

    // The body background should revert to dark
    cy.get('.svg_editor').should('have.css', 'background-color').and('equal', 'rgb(30, 30, 30)') // #1e1e1e
  })
})
