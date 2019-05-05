/// <reference types="Cypress" />

describe('Navigation', () => {


    it('visit google', function() {
        cy.visit('/');
    });

    it('controls are visible', () => {
        cy.get('[data-test=controls-alert]').should('be.visible')
        cy.get('[data-test=controls-checkin]').should('be.visible')
        cy.get('[data-test=controls-beer]').should('be.visible')
        cy.get('[data-test=controls-wine]').should('be.visible')
        cy.get('[data-test=controls-liquor]').should('be.visible')
    })

    it('menu button is visible and works properly', () => {
        cy.get('[data-test=home-menu-button]').should('be.visible').click()
        cy.get('[data-test=menu-history]').should('be.visible')
        cy.get('[data-test=menu-friends]').should('be.visible')
        cy.get('[data-test=menu-settings]').should('be.visible')
        cy.get('[data-test=menu-ride]').should('be.visible')
    })




})
