import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const StageColumn = ({ stage, index, onCardClick }) => {
	const getStageIdentifier = stageName => {
		return stageName.toLowerCase().split(' ')[0];
	};

	return (
		<Col md={4} className='mb-4'>
			<Card className='h-100'>
				<Card.Header
					data-testid={`stage-header-${getStageIdentifier(stage.title)}`}
				>
					{stage.title}
				</Card.Header>
				<Card.Body>
					<Droppable droppableId={stage.id.toString()}>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								data-testid={`stage-dropzone-${getStageIdentifier(
									stage.title
								)}`}
								style={{
									minHeight: '200px',
									padding: '8px',
									backgroundColor: '#f8f9fa',
									borderRadius: '4px',
								}}
								className='stage-dropzone'
							>
								{stage.candidates.map((candidate, candidateIndex) => (
									<Draggable
										key={candidate.id}
										draggableId={candidate.id.toString()}
										index={candidateIndex}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												data-testid={`candidate-card-${getStageIdentifier(
													stage.title
												)}-${candidate.name.toLowerCase().replace(' ', '-')}`}
												className='candidate-card'
												style={{
													...provided.draggableProps.style,
													opacity: snapshot.isDragging ? 0.5 : 1,
												}}
												onClick={() => onCardClick(candidate)}
											>
												<Card className='mb-2'>
													<Card.Body>
														<Card.Title>{candidate.name}</Card.Title>
														<Card.Text>Rating: {candidate.rating}</Card.Text>
													</Card.Body>
												</Card>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default StageColumn;
