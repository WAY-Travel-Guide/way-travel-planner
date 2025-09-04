import React from 'react';
import { ToHomeButton } from "../../shared/";
import { MapConstructor } from '../mapView/';
import { Introduction } from './Introduction.jsx';
import './UserForm.css';

const UserForm = () => {
    const steps = [
        { id: "intro", content: <Introduction /> },
        { id: "map", content: <MapConstructor /> }
    ];
    
    return (
        <div className="start-form">
            <ToHomeButton />
            
            <div className="step-content-container">
                {steps.map((step, index) => (
                    <div className="step-section" key={index}>
                    {typeof step.content === "function"
                        ? step.content({ step, index })
                        : step.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { UserForm };