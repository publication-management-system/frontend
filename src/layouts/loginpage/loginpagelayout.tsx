import React from 'react'
import './loginpage.css'

interface LoginPageLayoutProps {
    children?: React.ReactNode
    className?: string
}

export const LoginPageLayout = (props : LoginPageLayoutProps): React.JSX.Element => {
    return (
        <div className={`login-page ${props.className || ''}`}>
            {props.children}
        </div>
    )
}