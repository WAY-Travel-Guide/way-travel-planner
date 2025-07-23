import React from 'react';
import VerticalStepScroller from "./VerticalStepScroller.jsx";
import './UserForm.css';
import steps from "./StepsArray.jsx";
import { ToHomeButton } from "../../shared/";

const UserForm = ({ userName }) => {
    return (
        <div className="start-form">
            <ToHomeButton />
            
            <VerticalStepScroller steps={steps} />
        </div>
    );
};

export { UserForm };