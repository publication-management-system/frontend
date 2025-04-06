import React from "react";
import {Link} from "react-router-dom";
import './landingpagenavitems.css'

export const LandingPageNavItems = () : React.JSX.Element => {
    return (
        <div className={'landing-page-nav'}>
            <Link to={'/features'}>Features</Link>
            <Link to={'/usecases'}>Use cases</Link>
            <Link to={'/docs'}>Docs</Link>
        </div>
    )
}