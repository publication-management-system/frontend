import type { ReactNode } from "react";
import React from "react";

import style from "./register-steps.module.css";

interface RegisterStepsProps {
    stepCount: number;
    currentStep: number;
    children?: ReactNode;
}

export const RegisterSteps = (props: RegisterStepsProps): React.JSX.Element => {
    const stepHeaders = [...Array(props.stepCount).keys()].map((_, i) => {
        const isActive = props.currentStep >= i + 1;

        return (
            <span key={`step-${i}`} className={`${style.stepHeaderItem} ${isActive ? style.stepActive : ""}`}>
                {i + 1}
            </span>
        );
    });

    return (
        <div className={style.registerSteps}>
            <div className={style.registerStepsHeader}>{props.stepCount > 0 && stepHeaders}</div>

            {props.children}
        </div>
    );
};

interface RegisterStepProps {
    children?: ReactNode;
    label: string;
    visible: boolean;
}

export const RegisterStep = (props: RegisterStepProps): React.JSX.Element => {
    return (
        <div className={`${style.stepView} ${props.visible ? "" : style.stepHidden}`}>
            <h1 className={"header-small text-gray"}>{props.label}</h1>
            {props.children}
        </div>
    );
};
