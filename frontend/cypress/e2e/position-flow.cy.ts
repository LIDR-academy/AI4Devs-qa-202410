/// <reference types="cypress" />

describe('Flujo de Posición', () => {
  const POSITION_ID = 1
  const CANDIDATE_ID = 1

  beforeEach(() => {
    cy.interceptPositionAPI(POSITION_ID)
    cy.visitPosition(POSITION_ID)
  })

  describe('Fase 1: Carga de la Página de Position', () => {
    it('debe mostrar el título de la posición correctamente', () => {
      cy.get('[data-testid="position-title"]')
        .should('be.visible')
        .and('contain', 'Desarrollador Frontend')
    })

    it('debe renderizar todas las columnas del proceso', () => {
      cy.get('[data-testid="column"]').should('have.length', 3)
      cy.get('[data-testid="column-1"]').should('contain', 'CV Review')
      cy.get('[data-testid="column-2"]').should('contain', 'Technical Interview')
      cy.get('[data-testid="column-3"]').should('contain', 'HR Interview')
    })

    it('debe mostrar las tarjetas de candidatos en las columnas correctas', () => {
      cy.get('[data-testid="column-1"]')
        .find('[data-testid="candidate-card"]')
        .should('have.length', 1)
        .and('contain', 'Juan Pérez')
    })
  })

  describe('Fase 2: Cambio de Fase de un Candidato', () => {
    beforeEach(() => {
      cy.interceptCandidateUpdate(CANDIDATE_ID)
    })

    it('debe permitir arrastrar un candidato a otra columna', () => {
      const sourceCard = '[data-testid="candidate-1"]'
      const targetColumn = '[data-testid="column-2"]'

      cy.dragAndDrop(sourceCard, targetColumn)

      // Verificar que la tarjeta se movió visualmente
      cy.get(targetColumn)
        .find(sourceCard)
        .should('exist')

      // Verificar que se llamó a la API para actualizar
      cy.wait('@candidateUpdate')
        .its('request.body')
        .should('deep.equal', {
          columnId: 2
        })
    })
  })
}) 