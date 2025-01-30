/// <reference types="cypress" />

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
	// Validate elements are visible and get their positions
	return cy
		.get(sourceSelector)
		.should('be.visible')
		.then($source => {
			cy.get(targetSelector)
				.should('be.visible')
				.then($target => {
					// Get element coordinates
					const sourceBox = $source[0].getBoundingClientRect();
					const targetBox = $target[0].getBoundingClientRect();

					// Calculate start and end points (center of elements)
					const start = {
						x: sourceBox.left + sourceBox.width / 2,
						y: sourceBox.top + sourceBox.height / 2,
					};

					const end = {
						x: targetBox.left + targetBox.width / 2,
						y: targetBox.top + targetBox.height / 2,
					};

					// Calculate the movement distance
					const distance = {
						x: end.x - start.x,
						y: end.y - start.y,
					};

					// Initialize drag sequence
					cy.wrap($source)
						.trigger('mousedown', {
							button: 0,
							clientX: start.x,
							clientY: start.y,
							force: true,
						})
						.wait(100) // Small delay to simulate human movement
						.trigger('dragstart', {
							dataTransfer: new DataTransfer(),
							clientX: start.x,
							clientY: start.y,
							force: true,
						})
						.wait(100);

					// Simulate movement in small steps
					const steps = 10;
					for (let i = 1; i <= steps; i++) {
						const progress = i / steps;
						const currentX = start.x + distance.x * progress;
						const currentY = start.y + distance.y * progress;

						cy.wrap($source).trigger('mousemove', {
							button: 0,
							clientX: currentX,
							clientY: currentY,
							force: true,
						});

						if (i === Math.floor(steps / 2)) {
							// When halfway, trigger dragenter on target
							cy.wrap($target).trigger('dragenter', {
								force: true,
							});
						}

						if (i > Math.floor(steps / 2)) {
							// After halfway, trigger dragover on target
							cy.wrap($target).trigger('dragover', {
								force: true,
							});
						}
					}

					// Complete the drop sequence
					cy.wrap($target)
						.trigger('drop', {
							force: true,
						})
						.wait(100);

					// End the drag sequence
					cy.wrap($source)
						.trigger('dragend', {
							force: true,
						})
						.trigger('mouseup', {
							button: 0,
							clientX: end.x,
							clientY: end.y,
							force: true,
						});

					// Wait for react-beautiful-dnd to complete
					cy.wait(500);
				});
		});
});
