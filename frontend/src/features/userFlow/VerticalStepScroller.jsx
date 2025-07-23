import React, { useState } from "react";
import { CircleButton } from "../../shared/";
import "./VerticalStepScroller.css";

const VerticalStepScroller = ({ steps }) => {
    const [current, setCurrent] = useState(0);

    return (
        <div className="step-scroller-wrapper">
        <div className="step-controls">
            {steps.map((_, idx) => (
            <CircleButton
                key={idx}
                id={idx + 1}
                active={current === idx}
                onClick={() => setCurrent(idx)}
                color="#fff"
            />
            ))}
        </div>
        <div className="step-content-container" style={{ transform: `translateY(-${current * 100}%)` }}>
            {steps.map((step) => (
                <div key={step.id}>{step.content}</div>
            ))}
        </div>
        </div>
    );
};

export default VerticalStepScroller;
