describe('Position Detail Page', () => {
  beforeEach(() => {
    // Interceptamos la llamada al flujo de entrevista
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', {
      fixture: 'interviewFlow.json'
    }).as('getInterviewFlow');

    // Interceptamos la llamada a los candidatos
    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', {
      fixture: 'positionCandidates.json'
    }).as('getPositionCandidates');

    // Visitamos la página de detalle
    cy.visit('http://localhost:3000/positions/1');
    cy.wait(['@getInterviewFlow', '@getPositionCandidates']);
  });

  describe('Carga del Detalle de la Posición', () => {
    it('debería mostrar el título de la posición correctamente', () => {
      cy.get('[data-testid="position-detail-title"]')
        .should('be.visible')
        .and('contain', 'Frontend Developer');
    });

    it('debería mostrar las columnas del proceso de contratación', () => {
      // Verificar que existen las tres columnas
      cy.get('.stage-column').should('have.length', 3);

      // Verificar el nombre de cada columna en orden
      cy.get('[data-testid="stage-title"]').eq(0)
        .should('contain', 'Initial Screening');
      
      cy.get('[data-testid="stage-title"]').eq(1)
        .should('contain', 'Technical Interview');
      
      cy.get('[data-testid="stage-title"]').eq(2)
        .should('contain', 'Manager Interview');

      // Tomar screenshot después de verificar el título
      cy.screenshot('position-detail-page');
    });

    it('debería mostrar los candidatos en las columnas correctas', () => {
      cy.get('.stage-column').eq(0)
        .find('[data-testid="candidate-name"]')
        .should('contain', 'Ana Martínez');

      cy.get('.stage-column').eq(1)
        .find('[data-testid="candidate-name"]')
        .should('contain', 'Roberto Silva');

      cy.get('.stage-column').eq(2)
        .find('[data-testid="candidate-name"]')
        .should('contain', 'María González');
    });
  });
}); 