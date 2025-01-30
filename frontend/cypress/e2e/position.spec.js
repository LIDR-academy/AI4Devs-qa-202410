/// <reference types="cypress" />

describe('Position Details Page', () => {
	beforeEach(() => {
		// Mock de la respuesta del flujo de entrevistas
		cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow', {
			statusCode: 200,
			body: {
				interviewFlow: {
					positionName: 'Software Engineer',
					interviewFlow: {
						interviewSteps: [
							{ id: 1, name: 'Initial Screen', orderIndex: 0 },
							{ id: 2, name: 'Technical Interview', orderIndex: 1 },
							{ id: 3, name: 'Final Interview', orderIndex: 2 },
						],
					},
				},
			},
		}).as('getInterviewFlow');

		// Mock de la respuesta de candidatos
		cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', {
			statusCode: 200,
			body: [
				{
					id: 1,
					candidateId: 1,
					fullName: 'John Doe',
					currentInterviewStep: 'Initial Screen',
					currentStepId: 1,
					averageScore: 4,
					applicationId: 101,
				},
				{
					id: 2,
					candidateId: 2,
					fullName: 'Jane Smith',
					currentInterviewStep: 'Technical Interview',
					currentStepId: 2,
					averageScore: 5,
					applicationId: 102,
				},
			],
		}).as('getCandidates');

		// Mock de la actualización del estado del candidato
		cy.intercept('PUT', 'http://localhost:3010/candidates/*', req => {
			// Log para depuración
			console.log('Received request body:', req.body);

			req.reply({
				statusCode: 200,
				body: { message: 'Candidate updated successfully' },
			});
		}).as('updateCandidate');

		cy.visit('/positions/1');
		return cy.wait(['@getInterviewFlow', '@getCandidates']);
	});

	it('should load position details correctly', () => {
		// Verificar título de la posición
		cy.get('[data-testid="position-title"]')
			.should('be.visible')
			.and('contain', 'Software Engineer');

		// Verificar columnas de etapas
		cy.get('[data-testid="stages-container"]').within(() => {
			cy.get('[data-testid="stage-header-initial"]').should(
				'contain',
				'Initial Screen'
			);
			cy.get('[data-testid="stage-header-technical"]').should(
				'contain',
				'Technical Interview'
			);
			cy.get('[data-testid="stage-header-final"]').should(
				'contain',
				'Final Interview'
			);
		});

		// Verificar candidatos en las columnas correctas
		cy.get('[data-testid="candidate-card-initial-john-doe"]').should(
			'be.visible'
		);
		cy.get('[data-testid="stage-dropzone-initial"]').should(
			'contain',
			'John Doe'
		);
		cy.get('[data-testid="stage-dropzone-technical"]').should(
			'contain',
			'Jane Smith'
		);
	});

	it('should move candidate to different stage', () => {
		// Esperar a que el contenedor de etapas esté visible primero
		cy.get('[data-testid="stages-container"]').should('be.visible');

		// Esperar a que los elementos estén completamente cargados y sean visibles
		cy.get('[data-testid="stage-dropzone-initial"]')
			.should('be.visible')
			.and('have.css', 'min-height', '200px')
			.within(() => {
				cy.get('[data-testid="candidate-card-initial-john-doe"]')
					.should('be.visible')
					.and('contain', 'John Doe');
			});

		cy.get('[data-testid="stage-dropzone-technical"]')
			.should('be.visible')
			.and('have.css', 'min-height', '200px');

		// Realizar drag and drop
		cy.dragAndDrop(
			'[data-testid="candidate-card-initial-john-doe"]',
			'[data-testid="stage-dropzone-technical"]'
		);

		// Esperar y verificar la solicitud
		return cy.wait('@updateCandidate').then(interception => {
			// Log para depuración
			cy.log('Request body:', JSON.stringify(interception.request.body));
			cy.log(
				'Expected body:',
				JSON.stringify({
					applicationId: 101,
					currentInterviewStep: 2,
				})
			);

			// Verificar cada propiedad individualmente
			cy.wrap(interception.request.body).should(
				'have.property',
				'applicationId',
				101
			);
			cy.wrap(interception.request.body).should(
				'have.property',
				'currentInterviewStep',
				2
			);
		});

		// Verificar que el candidato se movió visualmente
		cy.get('[data-testid="stage-dropzone-technical"]')
			.should('be.visible')
			.and('contain', 'John Doe');
	});

	// it('should show candidate details when clicking on card', () => {
	// 	cy.get('[data-testid="candidate-card-technical-jane-smith"]').click();
	// 	cy.get('[data-testid="candidate-details-slide"]')
	// 		.should('be.visible')
	// 		.and('contain', 'Jane Smith');
	// });
});
