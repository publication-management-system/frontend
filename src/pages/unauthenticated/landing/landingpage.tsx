import React from "react";
import {LandingPageLayout} from "../../../layouts/landingpage/landingpagelayout.tsx";
import {Navigation} from "../../../components/navigation/navigation.tsx";
import {Button} from "../../../components/button/button.tsx";
import {LandingPageNavItems} from "../../../components/navigation/landingpage/landingpagenavitems.tsx";
import {useNavigate} from "react-router-dom";
import './landingpage.css'

export const LandingPage = (): React.JSX.Element => {

    const navigate = useNavigate();

    return (
        <LandingPageLayout>
            <Navigation>
                <h1 className={'header-logo'}>PMS</h1>
                <LandingPageNavItems/>
                <div>
                    <Button onClick={() => navigate('/login')}>Sign in</Button>
                </div>
            </Navigation>
            <div className={'landing-section centered-section gradient-background'}>
                <div className={'content centered-section'}>
                    <h1>Your institution&apos;s publication management</h1>
                    <Button className={'get-started-button'} onClick={() => navigate('/register')}>
                        Get Started now
                    </Button>

                    <img src={'/teaching-image.svg'} className={'image-section-one'} alt={'Get Started'} />
                </div>
            </div>
        </LandingPageLayout>
    )
}