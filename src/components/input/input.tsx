import React, {ChangeEvent, InputHTMLAttributes} from "react";
import './input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    label: string;
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email" | "tel" | "password_confirmation" | "file";
}

export const Input = (props: InputProps): React.JSX.Element => {
    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (props.onChange) {
            props.onChange(e)
        } else {
            console.warn('OnChange is not implemented.');
        }
    }

    return (
        <div className={'input-field'}>
            <label htmlFor={props.label.trim().replace(' ', '').toLowerCase()}>{props.label}</label>
            <input id={props.label.trim().replace(' ', '').toLowerCase()}
                   value={props.value ?? ''}
                   type={props.type ?? 'text'}
                   onChange={onInputChange} />
        </div>
    )
}