describe('Positions Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3010/positions', {
      fixture: 'positions.json'
    }).as('getPositions');

    cy.visit('http://localhost:3000/positions');
    cy.wait('@getPositions');
  });

  describe('Carga de la Página de Position', () => {
    it('debería mostrar el título de la primera posición correctamente', () => {
      cy.get('.card-title').first()
        .should('be.visible')
        .and('contain', 'Frontend Developer');
      
      // Tomar screenshot después de verificar el contenido
      cy.screenshot('positions-page');
    });
  });
}); 