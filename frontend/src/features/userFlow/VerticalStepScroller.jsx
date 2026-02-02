import React, { useState } from "react";
import { CircleButton } from "../../shared/";
import "./VerticalStepScroller.css";

const VerticalStepScroller = ({ steps }) => {
    const [current, setCurrent] = useState(0);

    // Функция для перехода к следующему шагу
    const goToNextStep = () => {
        if (current < steps.length - 1) {
            setCurrent(current + 1);
        }
    };

    // Функция для перехода к предыдущему шагу
    const goToPreviousStep = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    // Функция для перехода к конкретному шагу
    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrent(stepIndex);
        }
    };

    return (
        <div className="step-scroller-wrapper">
            <div className="step-controls">
                {steps.map((_, idx) => (
                    <CircleButton
                        key={idx}
                        id={idx + 1}
                        active={current === idx}
                        onClick={() => {}} // Убираем клик - кнопки неактивны
                        color="#fff"
                        disabled={true} // Делаем кнопки неактивными
                    />
                ))}
            </div>
            <div className="step-content-container" style={{ transform: `translateY(-${current * 100}%)` }}>
                {steps.map((step, index) => (
                    <div key={step.id}>
                        {typeof step.content === 'function' 
                            ? step.content({
                                // Передаем функции навигации в каждый шаг
                                goToNextStep,
                                goToPreviousStep,
                                goToStep,
                                currentStep: current,
                                totalSteps: steps.length,
                                isFirstStep: index === 0,
                                isLastStep: index === steps.length - 1
                            })
                            : step.content
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalStepScroller;
