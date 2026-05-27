import React, { useEffect, useState } from "react";

import { getUserInfo } from "../../data/accesstokenutil.ts";
import { authenticatedClient } from "../../data/client.ts";
import type { User } from "../../data/user.ts";
import { Button } from "../button/button.tsx";
import type { Column } from "../table/table.tsx";
import { Table } from "../table/table.tsx";

interface InstitutionUserTableProps {
    institutionId: string;

    onError(error: string): void;
}

export const InstitutionUsersTable = (props: InstitutionUserTableProps): React.JSX.Element => {
    const columns: Column<User>[] = [
        { header: "First Name", accessor: "lastName" },
        { header: "Last Name", accessor: "firstName" },
        { header: "Email", accessor: "email" },
    ];

    const [institutionUsers, setInstitutionusers] = useState<User[]>([]);

    const fetchInstitutionUsers = async () => {
        await authenticatedClient
            .get(`/api/users/institution/${getUserInfo().institutionId}`)
            .then((response) => {
                setInstitutionusers(response.data);
            })
            .catch((error) => {
                props.onError(error);
            });
    };

    useEffect(() => {
        fetchInstitutionUsers();
    }, []);

    return (
        <Table
            columns={columns}
            data={institutionUsers}
            actions={(user) => (
                <Button
                    onClick={() => {
                        alert(user.id);
                    }}
                >
                    View
                </Button>
            )}
        />
    );
};
