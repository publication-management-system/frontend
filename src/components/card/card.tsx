import React from "react";
import './card.css'

interface CardProps {
    children?: React.ReactNode;
    className?: string;
}

export const Card = (props: CardProps): React.JSX.Element => {
    return (
        <div className={`card ${props.className || ''}`}>
            {props.children}
        </div>
    )
}