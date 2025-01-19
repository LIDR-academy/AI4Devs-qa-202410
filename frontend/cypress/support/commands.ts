/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export {}; // This ensures the file is treated as a module

declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).should('exist').then((source) => {
    const sourceRect = source[0].getBoundingClientRect();

    cy.get(targetSelector).should('exist').then((target) => {
      const targetRect = target[0].getBoundingClientRect();

      const dataTransfer = new DataTransfer();

      // Calculate the center coordinates of the source and target elements
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      // Start the drag operation
      cy.get(sourceSelector)
        .trigger('mousedown', {
          button: 0,
          clientX: sourceCenterX,
          clientY: sourceCenterY,
          dataTransfer,
          force: true,
        })
        .wait(200) // Short wait to ensure the mousedown is registered
        .trigger('mousemove', {
          button: 0,
          clientX: sourceCenterX + 20, // More pronounced move to initiate drag
          clientY: sourceCenterY + 20,
          dataTransfer,
          force: true,
        })
        .wait(200) // Short wait to simulate dragging
        .trigger('mousemove', {
          button: 0,
          clientX: targetCenterX - 20, // Move closer to the target
          clientY: targetCenterY - 20,
          dataTransfer,
          force: true,
        })
        .wait(200) // Short wait to simulate dragging
        .trigger('mousemove', {
          button: 0,
          clientX: targetCenterX,
          clientY: targetCenterY,
          dataTransfer,
          force: true,
        })
        .trigger('mouseup', { force: true });

      // Ensure the target receives the drop
      cy.get(targetSelector)
        .trigger('mousemove', {
          button: 0,
          clientX: targetCenterX,
          clientY: targetCenterY,
          dataTransfer,
          force: true,
        })
        .trigger('mouseup', { force: true });
    });
  });
});