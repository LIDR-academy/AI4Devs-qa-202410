describe('Position Detail - Drag and Drop', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', {
        fixture: 'interviewFlow.json'
      }).as('getInterviewFlow');
  
      cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', {
        fixture: 'positionCandidates.json'
      }).as('getPositionCandidates');
  
      // Interceptamos la llamada PUT al mover un candidato
      cy.intercept('PUT', 'http://localhost:3010/candidates/2', {
        statusCode: 200,
        body: { message: 'Candidate updated successfully' }
      }).as('updateCandidate');
  
      cy.visit('http://localhost:3000/positions/1');
      cy.wait(['@getInterviewFlow', '@getPositionCandidates']);
    });
  
    it('debería mostrar los candidatos en sus columnas iniciales', () => {
      // Verificar que Ana Martínez está en Initial Screening
      cy.get('.stage-column').eq(0)
        .should('contain', 'Initial Screening')
        .and('contain', 'Ana Martínez');
  
      // Verificar que Roberto Silva está en Technical Interview
      cy.get('.stage-column').eq(1)
        .should('contain', 'Technical Interview')
        .and('contain', 'Roberto Silva');
  
      // Verificar que María González está en Manager Interview
      cy.get('.stage-column').eq(2)
        .should('contain', 'Manager Interview')
        .and('contain', 'María González');
    });
  
    it('debería permitir arrastrar una tarjeta de candidato', () => {
      // Verificar que el candidato es arrastrable
      cy.get('[data-testid="candidate-card"]')
        .first()
        .should('exist')
        .and('be.visible')
        .focus({ force: true })
        .type(' ', { force: true });
  
      // Verificar que el candidato está en modo arrastre
      cy.get('[data-rbd-draggable-context-id]')
        .should('exist');
    });
  
    it('debería mover la tarjeta del candidato a la nueva columna y verificar que sí se ha movido', () => {
      // Verificar posición inicial
      cy.get('.stage-column').eq(0)
        .should('contain', 'Ana Martínez');
  
      // Realizar el drag and drop
      cy.get('[data-testid="candidate-card"]')
        .first()
        .focus({ force: true })
        .type(' ', { force: true })
        .type('{rightarrow}', { force: true })
        .type(' ', { force: true });
  
      // Verificar que el candidato ya no está en la columna original
      cy.get('.stage-column').eq(0)
        .should('not.contain', 'Ana Martínez');
  
      // Verificar que el candidato está en la nueva columna
      cy.get('.stage-column').eq(1)
        .should('contain', 'Ana Martínez');
      cy.screenshot('candidate-drag-and-drop');
    });
  
    it('debería actualizar la fase del candidato en el backend', () => {
      // Realizar el drag and drop
      cy.get('[data-testid="candidate-card"]')
        .first()
        .focus({ force: true })
        .type(' ', { force: true })
        .type('{rightarrow}', { force: true })
        .type(' ', { force: true });
  
      // Verificar la llamada al backend
      cy.wait('@updateCandidate').then((interception) => {
        // Verificar método y URL
        expect(interception.request.method).to.equal('PUT');
        expect(interception.request.url)
          .to.equal('http://localhost:3010/candidates/2');
  
        // Verificar cuerpo de la petición
        expect(interception.request.body).to.deep.equal({
          applicationId: 3,
          currentInterviewStep: 2
        });
  
        // Verificar respuesta exitosa
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });