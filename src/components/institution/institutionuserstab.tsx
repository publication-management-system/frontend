import {InstitutionData} from "../../data/user.ts";
import React, {useEffect, useState} from "react";
import {Card} from "../card/card.tsx";
import {InstitutionUsersTable} from "./institutionuserstable.tsx";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {authenticatedClient} from "../../data/client.ts";

interface InstitutionUsersTabProps {
    onModalOpen: () => void;
    onError: (error: string) => void;
}

export const InstitutionUsersTab = (props: InstitutionUsersTabProps): React.JSX.Element => {

    const [institutionDetails, setInstitutionDetails] = useState<InstitutionData>({
        loadingInstitution: true,
        institution: undefined
    });

    const loadInstitutionDetails = async (): Promise<void> => {
        const instDetails = await authenticatedClient.get(`/api/institutions/${getUserInfo().institutionId}`)
            .then(response => response.data);

        setInstitutionDetails({loadingInstitution: false, institution: instDetails});
    }

    useEffect(() => {
        loadInstitutionDetails();
    }, [])

    return (
        <div className={"institution-tab-contents"}>
            <div className={"institution-page-row"}>
                <Card className={"content institution-card"}>
                    <h1>{institutionDetails.institution?.name ?? ""}</h1>
                    <h2>{institutionDetails.institution?.address}</h2>
                </Card>
            </div>

            <div className={"institution-page-row"}>
                <div className={"content"}>
                    <InstitutionUsersTable institutionId={getUserInfo()?.institutionId}
                                           onError={props.onError}/>
                </div>
            </div>
        </div>
    );
}
