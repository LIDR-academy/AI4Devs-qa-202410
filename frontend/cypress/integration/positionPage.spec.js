describe('Carga de la Página de Position', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
  });

  it('Verifica que el título de la posición se muestra correctamente', () => {
    cy.get('h2.text-center', { timeout: 10000 }).should('be.visible');
    cy.get('[data-test="position-title"]').should('have.text', 'Senior Full-Stack Engineer');
  });

  it('Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación', () => {
    const expectedStages = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
    cy.get('.col-md-3', { timeout: 10000 }).should('have.length', expectedStages.length);
    expectedStages.forEach((stage, index) => {
      cy.get(`[data-test="stage-header-${index}"]`).should('be.visible');
    });
  });

  it('Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual', () => {
    cy.reload();

    const candidates = {
      0: ['Carlos García'], // Initial Screening
      1: ['John Doe', 'Jane Smith'], // Technical Interview
      2: [] // Manager Interview
    };

    Object.entries(candidates).forEach(([index, names]) => {
      cy.get(`[data-test="stage-header-${index}"]`).parent().within(() => {
        names.forEach((name) => {
          cy.get(`[data-test^="candidate-card-"]`).contains(name).should('be.visible');
        });
      });
    });
  });
});

describe('Cambio de Fase de un Candidato', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
  });

  it('Simula el arrastre de una tarjeta de candidato de una columna a otra', () => {
    const candidateId = 1; // Usamos el ID del candidato
    const newStageIndex = 2; // Índice de la columna "Manager Interview"

    // Usa el comando personalizado para simular el arrastre
    cy.dragAndDrop(`[data-test="candidate-card-${candidateId}"]`, `[data-test="stage-header-${newStageIndex}"]`);

    // Espera breve para permitir la actualización del DOM
    cy.wait(1000);

    // Verifica que el candidato ya no esté en la columna anterior
    cy.get(`[data-test="stage-header-1"]`).parent().find('.card-body') // Índice de "Technical Interview"
      .should('not.contain.text', `candidate-card-${candidateId}`);

    // Verifica que el candidato esté en la nueva columna
    cy.get(`[data-test="stage-header-${newStageIndex}"]`).parent().find('.card-body')
      .should('contain.text', `candidate-card-${candidateId}`);
  });
  
  it('Verifica que la tarjeta del candidato se mueve a la nueva columna', () => {
    const candidateId = 1; // Usamos el ID del candidato
    const newStageIndex = 2; // Índice de la columna "Manager Interview"

    cy.get(`[data-test="stage-header-${newStageIndex}"]`, { timeout: 10000 }).parent().find('.card-body')
      .should('contain.text', `candidate-card-${candidateId}`);

    cy.get(`[data-test="stage-header-"]`).not(`[data-test="stage-header-${newStageIndex}"]`).parent().find('.card-body')
      .should('not.contain.text', `candidate-card-${candidateId}`);
  });

  it('Verifica que la fase del candidato se actualiza correctamente en el backend', () => {
    const candidateId = 1;
    const newStageIndex = 2; // Índice de la columna "Manager Interview"

    cy.intercept('PUT', `/candidate/${candidateId}`).as('updateCandidateStage');
    cy.get(`[data-test="candidate-card-${candidateId}"]`).trigger('dragstart', { force: true });
    cy.get(`[data-test="stage-header-${newStageIndex}"]`).parent().trigger('drop', { force: true });
    cy.wait('@updateCandidateStage', { timeout: 15000 }).its('request.body').should('include', { stage: newStageIndex });
  });
});
