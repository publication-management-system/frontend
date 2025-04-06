import React, {FormEvent} from "react";
import './form.css'

interface FormProps {
    children?: React.ReactNode,
    onSubmit?: () => void,
    className?: string,
}

export const Form = (props : FormProps) : React.ReactNode => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (props.onSubmit) {
            e.preventDefault();
            props.onSubmit();
        }
    }

    return (
        <form className={`app-form ${props.className || ''}`} onSubmit={handleSubmit}>
            {props.children}
        </form>
    )
}