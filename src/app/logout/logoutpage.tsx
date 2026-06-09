import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = (): React.JSX.Element => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate("/");
    }, [navigate]);

    return <div></div>;
};
