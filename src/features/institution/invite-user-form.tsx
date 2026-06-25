import React from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../components/button/button.tsx";
import { Form } from "../../components/form/form.tsx";
import { Input } from "../../components/input/input.tsx";
import { getUserInfo } from "../../data/accesstokenutil.ts";
import type { Invitation } from "../../data/user.ts";

import { sendInvitation } from "./api";

import styles from "./invite-users-form.module.css";

export const InviteUserForm = ({ onSuccess }: { onSuccess: (invitation: Invitation) => void }): React.JSX.Element => {
    const onSubmit = async (values: FieldValues) => {
        const response = await sendInvitation(values.institutionId as string, values.email as string);
        onSuccess(response);
    };

    const { register, handleSubmit } = useForm();

    return (
        <Form className={styles.inviteUsersForm} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email", { required: true })} placeholder={"Invite Users"} />
            <Input
                {...register("institutionId", { required: true })}
                hidden={true}
                defaultValue={getUserInfo().institutionId}
            />

            <Button>Invite</Button>
        </Form>
    );
};
