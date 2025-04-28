import {InstitutionData, InvitationData} from "../../data/user.ts";
import React, {useEffect, useState} from "react";
import {Card} from "../card/card.tsx";
import {Button} from "../button/button.tsx";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {authenticatedClient} from "../../data/client.ts";
import {InstitutionInvitationTable} from "./institutioninvitationtable.tsx";

interface InstitutionInvitationTabProps {
    // onModalOpen: () => void;
    onError: (error: string) => void;
}

export const InstitutionInvitationTab = (props: InstitutionInvitationTabProps): React.JSX.Element => {

    const [invitationDetails, setInvitationDetails] = useState<InvitationData>({
        loadingInvitation: true,
        invitation: undefined
    });

    const [institutionDetails, setInstitutionDetails] = useState<InstitutionData>({
        loadingInstitution: true,
        institution: undefined
    });

    const loadInvitationDetails = async (): Promise<void> => {
        const invDetails = await authenticatedClient.get(`/api/invitations`)
            .then(response => response.data);

        console.log(invDetails)

        setInvitationDetails({loadingInvitation: false, invitation: invDetails});
    }

    const loadInstitutionDetails = async (): Promise<void> => {
        const instDetails = await authenticatedClient.get(`/api/institutions/${getUserInfo().institutionId}`)
            .then(response => response.data);

        setInstitutionDetails({loadingInstitution: false, institution: instDetails});
    }

    useEffect(() => {
        loadInvitationDetails();
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
                {/*<Card className={"content"}>*/}
                {/*    <div>*/}
                {/*        <Button onClick={props.onModalOpen}>INVITE USERS</Button>*/}
                {/*    </div>*/}
                {/*</Card>*/}
            </div>

            <div className={"institution-page-row"}>
                <div className={"content"}>
                    <InstitutionInvitationTable onError={props.onError}/>
                </div>
            </div>
        </div>
    );
}
