import React from 'react'
import './landingpagelayout.css'

interface HomePageLayoutProps {
    children?: React.ReactNode
}

export const LandingPageLayout = ({children} : HomePageLayoutProps): React.JSX.Element => {
    return (
        <div className="landing-page">
            {children}
        </div>
    )
}