describe('Carga de la Página de Position', () => {
  before(() => {
    // Asegúrate de que el backend y frontend estén corriendo
    cy.visit('http://localhost:3000/positions/1'); // Navega a la página de una posición específica
  });

  it('Verifica que el título de la posición se muestra correctamente', () => {
    cy.get('h2.text-center').should('contain.text', 'Senior Full-Stack Engineer'); // Cambia al título correcto
  });

  it('Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación', () => {
    const expectedStages = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
    cy.get('.card-header', { timeout: 10000 }).should('have.length', expectedStages.length);
    expectedStages.forEach((stage, index) => {
      cy.get(`.card-header:eq(${index})`).should('contain.text', stage);
    });
  });

  it('Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual', () => {
    const expectedStages = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
    cy.get('.card-header').each(($header, index) => {
      cy.wrap($header).parent().find('.candidate-card').each(($card) => {
        cy.wrap($card).should('have.attr', 'data-stage', expectedStages[index]);
      });
    });
  });

  it('Simula el arrastre de una tarjeta de candidato de una columna a otra', () => {
    const candidateName = 'John Doe';
    const newStage = 'Technical Interview';

    // Encuentra la tarjeta del candidato en su fase actual
    cy.get('.card-body').contains(candidateName).as('candidateCard');

    // Simula el arrastre de la tarjeta a la nueva columna
    // Aquí se asume que hay un mecanismo para arrastrar y soltar
    cy.get('@candidateCard').trigger('dragstart');
    cy.get('.card-header').contains(newStage).parent().trigger('drop');
  });

  it('Verifica que la tarjeta del candidato se mueve a la nueva columna', () => {
    const candidateName = 'John Doe';
    const newStage = 'Technical Interview';

    // Verifica que el candidato ahora está en la nueva fase
    cy.get('.card-header').contains(newStage).parent().find('.candidate-card')
      .should('contain.text', candidateName);

    // Verifica que el candidato ya no está en la fase anterior
    cy.get('.card-header').not(':contains(' + newStage + ')').parent().find('.candidate-card')
      .should('not.contain.text', candidateName);
  });

  it('Verifica que la fase del candidato se actualiza correctamente en el backend', () => {
    const candidateId = 1; // Reemplaza con el ID real del candidato
    const newStage = 'Technical Interview';

    // Intercepta la solicitud PUT al backend
    cy.intercept('PUT', `/candidate/${candidateId}`).as('updateCandidateStage');

    // Simula el arrastre de la tarjeta (o cualquier acción que desencadene la actualización)
    cy.get('.card-body').contains('John Doe').trigger('dragstart');
    cy.get('.card-header').contains(newStage).parent().trigger('drop');

    // Espera a que la solicitud PUT se complete y verifica el cuerpo de la solicitud
    cy.wait('@updateCandidateStage').its('request.body').should('include', { stage: newStage });
  });
}); 