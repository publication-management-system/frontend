import clsx from "clsx";
import React from "react";

import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
}

export const Button = ({ className, children, ...props }: ButtonProps) => (
    <button className={clsx(styles.appButton, className)} {...props}>
        {children}
    </button>
);
