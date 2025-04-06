import React from "react";
import './authenticatedlayout.css'

interface AuthenticatedLayoutProps {
    children?: React.ReactNode,
    firstName?: string,
    lastName?: string,
}

export const AuthenticatedLayout = (props: AuthenticatedLayoutProps): React.JSX.Element => {
    return (
        <div className={"authenticated-layout"}>
            {props.children}
        </div>
    )
}