import React from "react";
import {Column, Table} from "../table/table.tsx";
import {Invitation} from "../../data/user.ts";
import {Button} from "../button/button.tsx";
import {Card} from "../card/card.tsx";

interface InstitutionInvitationTabProps {
    invitations: Invitation[];
    onModalOpen: () => void;
}

export const InstitutionInvitationTab = ({
                                             invitations,
                                             onModalOpen
                                         }: InstitutionInvitationTabProps): React.JSX.Element => {
    const columns: Column<Invitation>[] = [
        {header: "Email", accessor: "email"},
        {header: "Date Sent", accessor: "createdAt"},
        {header: "Date Accepted", accessor: "acceptedAt"},
    ];

    return (
        <div className={"institution-tab-contents"}>
            <div className={"institution-page-row"}>
                <Card className={"content"}>
                    <div>
                        <Button onClick={onModalOpen}>INVITE USERS</Button>
                    </div>
                </Card>
            </div>

            <div className={"institution-page-row"}>
                <div className={"content"}>
                    <Table columns={columns}
                           data={invitations
                               .map(invitation => ({
                                   ...invitation,
                                   createdAt: `Sent on ${new Date(invitation.createdAt).toDateString()}`,
                                   acceptedAt: invitation.acceptedAt ? `Accepted on ${new Date(invitation.acceptedAt).toDateString()}` : 'Not yet accepted'
                               }))
                           }
                    />
                </div>
            </div>
        </div>
    );
}
