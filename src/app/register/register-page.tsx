import clsx from "clsx";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import { RegisterForm } from "../../features/register/register-form";

import styles from "./register-page.module.css";

export const RegisterPage = (): React.JSX.Element => {
    const navigate = useNavigate();

    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div className={styles.formContainer}>
                    <div>
                        <h1 className={"header-small"}>Register</h1>
                        <p className={"body-text text-gray"}>Create your new Publication Management System account</p>
                    </div>
                    <RegisterForm onRegisterSuccess={() => navigate("/login")} />
                    <p className={"body-small-text text-gray"}>
                        No account? Register{" "}
                        <span>
                            <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </section>
        </main>
    );
};
