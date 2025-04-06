import React, {ReactNode} from "react";
import './registersteps.css'

interface RegisterStepsProps {
    stepCount: number;
    currentStep: number;
    children?: ReactNode;
}

export const RegisterSteps = (props: RegisterStepsProps): React.JSX.Element => {
    const stepHeaders = [...Array(props.stepCount).keys()]
        .map((_, i) => (<span key={`step-${i}`} className={`${props.currentStep >= (i + 1) ? 'step-active' : ''}`}>{i+1}</span>));

    return (
        <form className="register-steps">
            <div className="register-steps-header">
                {props.stepCount > 0 && stepHeaders}
            </div>
            {props.children}
        </form>
    )
}

interface RegisterStepProps {
    children?: ReactNode;
    label: string;
    visible: boolean;
}

export const RegisterStep = (props: RegisterStepProps): React.JSX.Element => {
    return (
        <div className={`step-view ${props.visible ? '' : 'step-hidden'}`}>
            <h1>{props.label}</h1>
            {props.children}
        </div>
    )
}