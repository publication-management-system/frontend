import React, {useEffect, useState} from "react";
import {Column, Table} from "../table/table.tsx";
import {Invitation} from "../../data/user.ts";
import {authenticatedClient} from "../../data/client.ts";
import {Button} from "../button/button.tsx";

interface InstitutionInvitationTableProps {

    onError(error: string): void;
}

export const InstitutionInvitationTable = (props: InstitutionInvitationTableProps): React.JSX.Element => {

    const columns: Column<Invitation>[] = [
        {header: "Link", accessor: "link"},
        {header: "Was taken", accessor: "wasTaken"},
    ];

    const [invitations, setInvitations] = useState<Invitation[]>([]);

    const fetchInvitations = async () => {
        await authenticatedClient.get(`/api/invitations`)
            .then(response => setInvitations(response.data))
            .catch((error) => props.onError(error));
    }

    useEffect(() => {
        fetchInvitations();
    }, []);


    return (
        <Table columns={columns} data={invitations} actions={(invitation) => (
            <Button onClick={() => alert(invitation.id)}>View</Button>
        )}/>
    )
}