import React from "react";
import {Link} from "react-router-dom";
import './authenticatednavitems.css'

export const AuthenticatedNavItems = (): React.JSX.Element => {
    return (
        <div className={'authenticated-nav-items'}>
            <Link to={'/app/dashboard'}>Dashboard</Link>
            <Link to={'/app/institution'}>My Institution</Link>
            <Link to={'/app/institution-profiling'}>Institution Profiling</Link>
        </div>
    )
}