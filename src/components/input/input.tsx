import type { ChangeEvent, InputHTMLAttributes } from "react";
import React from "react";

import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    label?: string;
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email" | "tel" | "password_confirmation" | "file";
}

export const Input = (props: InputProps): React.JSX.Element => {
    return (
        <div className={styles.inputField}>
            {props.label && (
                <label
                    className={"action"}
                    htmlFor={props.label.trim().replace(" ", "").toLowerCase()}
                >
                    {props.label}
                </label>
            )}
            <input
                id={props.label ? props.label.trim().replace(" ", "").toLowerCase() : ""}
                {...props}
            />
        </div>
    );
};
