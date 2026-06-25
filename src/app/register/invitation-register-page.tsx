import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import type { Invitation } from "../../data/user";
import { getInvitationById } from "../../features/institution/api";
import { RegisterInvitationForm } from "../../features/register/register-invitation-form";

import styles from "./register-page.module.css";

export const InvitationRegisterPage = (): React.JSX.Element => {
    const navigate = useNavigate();
    const [invitation, setInvitation] = useState<Invitation | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const { invitationId } = useParams();

    useEffect(() => {
        const fetchInvitation = async (invitationId: string) => {
            const response = await getInvitationById(invitationId);
            if (response.acceptedAt) {
                await navigate("/login");
                return;
            }
            setInvitation(response);
            setIsLoading(false);
        };

        if (!invitationId) {
            navigate("/not-found");
        }

        fetchInvitation(invitationId!);
    }, [invitationId]);

    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                {isLoading && <p>Loading...</p>}
                <div className={styles.formContainer}>
                    <div>
                        <h1 className={"header-small"}>Register</h1>
                        <p className={"body-text text-gray"}>Create your new Publication Management System account</p>
                    </div>
                    {invitation && (
                        <RegisterInvitationForm
                            invitation={invitation}
                            onRegisterSuccess={async () => {
                                await navigate("/login");
                            }}
                        />
                    )}
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
