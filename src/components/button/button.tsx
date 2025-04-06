import React from "react";
import './app-button.css'

interface ButtonProps {
    children?: React.ReactNode,
    name?: string,
    onClick?: () => void,
    className?: string,
}

export const Button = (props: ButtonProps): React.JSX.Element  => {

    const handleClicked = () => {
        if (props.onClick) {
            props.onClick();
        } else {
            console.warn('unhandled click event');
        }
    }

    return (
        <button className={`app-button ${props.className || ''}`} onClick={handleClicked}>
            {props.children}
        </button>
    )
}