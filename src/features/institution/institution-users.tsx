import type React from "react";

import type { Column } from "../../components/table/table";
import { Table } from "../../components/table/table";
import type { User } from "../../data/user";

import styles from "./institution-users.module.css";

export function InstitutionUsers({ institutionUsers }: { institutionUsers: User[] }): React.JSX.Element {
    const columns: Column<User>[] = [
        { header: "First Name", accessor: "lastName" },
        { header: "Last Name", accessor: "firstName" },
        { header: "Email", accessor: "email" },
    ];

    return (
        <div className={styles.details}>
            <h1 className={"header-small"}>Users</h1>
            <Table columns={columns} data={institutionUsers} />
        </div>
    );
}
