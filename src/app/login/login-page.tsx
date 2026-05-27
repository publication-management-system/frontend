import clsx from "clsx";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import LoginForm from "../../features/login/login-form";

import styles from "./login-page.module.css";

export const LoginPage = (): React.JSX.Element => {
    const navigate = useNavigate();

    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div className={styles.formContainer}>
                    <div>
                        <h1 className={"header-small"}>Log in</h1>
                        <p className={"body-text text-gray"}>Log in with your Publication Management System Account</p>
                    </div>
                    <LoginForm
                        onLoginSuccess={() => {
                            navigate("/admin-panel");
                        }}
                    />
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
