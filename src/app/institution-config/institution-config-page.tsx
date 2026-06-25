import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar";
import { getUserInfo } from "../../data/accesstokenutil";
import type { Institution } from "../../data/institution";
import type { Invitation, User } from "../../data/user";
import { getInstitutionData, getInstitutionUsers, getInvitations } from "../../features/institution/api";
import { InstitutionDetails } from "../../features/institution/institution-details";
import { InstitutionInvitations } from "../../features/institution/institution-invitations";
import { InstitutionUsers } from "../../features/institution/institution-users";

import styles from "./institution-config-page.module.css";

export const InstitutionConfigPage = (): React.JSX.Element => {
    const [institutionData, setInstitutionData] = useState<Institution | undefined>(undefined);
    const [institutionUsers, setInstitutionUsers] = useState<User[]>([]);
    const [institutionInvitations, setInstitutionInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = getUserInfo();
        if (!userInfo.userId) {
            navigate("/not-found");
            return;
        }

        const loadInstitutionData = async () => {
            const institutionData = await getInstitutionData(userInfo.institutionId);
            const users = await getInstitutionUsers(userInfo.institutionId);
            const invitations = await getInvitations();

            setInstitutionUsers(users);
            setInstitutionData(institutionData);
            setInstitutionInvitations(invitations);
            setLoading(false);
        };

        loadInstitutionData();
    }, [navigate]);

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                {loading && <p>Loading your institution data...</p>}

                {institutionData && <InstitutionDetails institution={institutionData} />}

                {institutionUsers.length > 0 && <InstitutionUsers institutionUsers={institutionUsers} />}

                <InstitutionInvitations
                    institutionInvitations={institutionInvitations}
                    onInvitationAdded={(inv) => {
                        setInstitutionInvitations([...institutionInvitations, inv]);
                    }}
                />
            </section>
        </main>
    );
};
