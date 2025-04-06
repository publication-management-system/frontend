import React, {useEffect} from "react";
import {LoginPageLayout} from "../../../layouts/loginpage/loginpagelayout.tsx";
import {useNavigate} from "react-router-dom";

export const LogoutPage = (): React.JSX.Element => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate('/');
    }, [navigate]);

    return (
        <LoginPageLayout>

        </LoginPageLayout>
    )
}