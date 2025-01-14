import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const StageColumn = ({ stage, index, onCardClick, ...props }) => {
    return (
        <Col md={4} {...props}>
            <div className="stage-column p-3">
                <h3 data-testid="stage-title">{stage.title}</h3>
                <Droppable droppableId={index.toString()}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="candidate-list"
                        >
                            {stage.candidates.map((candidate, index) => (
                                <Draggable
                                    key={candidate.id}
                                    draggableId={candidate.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => onCardClick(candidate)}
                                            className="candidate-card mb-2 p-2"
                                            data-testid="candidate-card"
                                        >
                                            <span data-testid="candidate-name">{candidate.name}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </Col>
    );
};

export default StageColumn;
