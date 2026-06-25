import React, { useState } from "react";

import { Button } from "../../components/button/button";
import type { ModalSettings } from "../../components/modal/modal";
import { Modal } from "../../components/modal/modal";
import type { Column } from "../../components/table/table";
import { Table } from "../../components/table/table";
import type { ToastSettings } from "../../components/toast/toast";
import { Toast } from "../../components/toast/toast";
import type { Invitation } from "../../data/user";

import { InviteUserForm } from "./invite-user-form";

import styles from "./institution-users.module.css";

export function InstitutionInvitations({
    institutionInvitations,
    onInvitationAdded,
}: {
    institutionInvitations: Invitation[];
    onInvitationAdded: (invitation: Invitation) => void;
}): React.JSX.Element {
    const columns: Column<Invitation>[] = [
        { header: "Email", accessor: "email" },
        { header: "Date Sent", accessor: "createdAt" },
        { header: "Date Accepted", accessor: "acceptedAt" },
    ];

    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: "",
    });

    const openModal = () => {
        setModalSettings({
            open: true,
            title: "Invite users to your institution",
            bodyComponent: (
                <InviteUserForm
                    onSuccess={(inv) => {
                        onInvitationAdded(inv);
                        setModalSettings({ open: false, title: "", bodyComponent: <></> });
                    }}
                />
            ),
        });
    };

    const [toastSettings, setToastSettings] = useState<ToastSettings>({
        open: false,
        message: "",
        type: "success",
    });

    return (
        <div className={styles.details}>
            {institutionInvitations.length > 0 && (
                <>
                    <h1 className={"header-small"}>Pending Invitations</h1>
                    <Table
                        columns={columns}
                        data={institutionInvitations}
                        actions={(inv) => (
                            <Button
                                onClick={async () => {
                                    await navigator.clipboard.writeText(inv.link);
                                    setToastSettings({
                                        ...toastSettings,
                                        open: true,
                                        message: "Invitation Copied to clipboard",
                                    });
                                }}
                            >
                                Copy to clipboard
                            </Button>
                        )}
                    />
                </>
            )}
            <Button onClick={openModal}>Invite users</Button>
            <Modal
                title={modalSettings.title}
                open={modalSettings.open}
                children={modalSettings.bodyComponent}
                onClose={() => {
                    setModalSettings({ ...modalSettings, open: false });
                }}
            />
            <Toast
                open={toastSettings.open}
                onToastClose={() => {
                    setToastSettings({ ...toastSettings, open: false });
                }}
                message={toastSettings.message}
                type={toastSettings.type}
            />
        </div>
    );
}
