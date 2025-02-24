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

export {}  // Convierte este archivo en un módulo

declare global {
  namespace Cypress {
    interface Chainable {
      interceptPositionAPI(positionId: number): Chainable<void>
      visitPosition(positionId: number): Chainable<void>
      dragAndDrop(source: string, target: string): Chainable<void>
      interceptCandidateUpdate(candidateId: number): Chainable<void>
    }
  }
}

Cypress.Commands.add('visitPosition', (positionId: number) => {
  cy.visit(`/positions/${positionId}`)
})

Cypress.Commands.add('dragAndDrop', (source: string, target: string) => {
  cy.get(source)
    .trigger('mousedown', { button: 0 })
    .trigger('mousemove', { clientX: 100, clientY: 100 })
  cy.get(target)
    .trigger('mousemove')
    .trigger('mouseup', { force: true })
})

Cypress.Commands.add('interceptPositionAPI', (positionId: number) => {
  cy.intercept('GET', `http://localhost:3010/positions/${positionId}`, {
    statusCode: 200,
    body: {
      id: positionId,
      title: 'Desarrollador Frontend',
      interviewSteps: [
        { id: 1, name: 'CV Review', orderIndex: 1 },
        { id: 2, name: 'Technical Interview', orderIndex: 2 },
        { id: 3, name: 'HR Interview', orderIndex: 3 }
      ],
      applications: [
        {
          id: 1,
          candidate: {
            id: 1,
            firstName: 'Juan',
            lastName: 'Pérez'
          },
          currentInterviewStep: 1
        }
      ]
    }
  }).as('positionAPI')
})

Cypress.Commands.add('interceptCandidateUpdate', (candidateId: number) => {
  cy.intercept('PUT', `http://localhost:3010/candidates/${candidateId}`, {
    statusCode: 200,
    body: {
      success: true
    }
  })
})