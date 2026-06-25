import type { ChangeEvent, TextareaHTMLAttributes } from "react";
import React from "react";

import styles from "./text-area.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    label?: string;
    onChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = (props: TextareaProps): React.JSX.Element => {
    return (
        <div className={styles.textareaField}>
            {props.label && <label htmlFor={props.label.trim().replace(" ", "").toLowerCase()}>{props.label}</label>}
            <textarea id={props.label ? props.label.trim().replace(" ", "").toLowerCase() : ""} {...props} />
        </div>
    );
};
