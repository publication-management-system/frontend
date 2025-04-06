import React from "react";
import './navigation.css'

interface NavigationProps {
    children? : React.ReactNode
    className?: string
}

export const Navigation = (props : NavigationProps): React.JSX.Element => {
    return (
        <nav className={`${props.className || ''}`}>
            <div className={`content`}>
                {props.children}
            </div>
        </nav>
    )
}