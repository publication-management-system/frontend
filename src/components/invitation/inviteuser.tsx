import React, {useState} from "react";
import {Button} from "../button/button.tsx";
import {authenticatedClient} from "../../data/client.ts";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {Form} from "../form/form.tsx";
import {Input} from "../input/input.tsx";
import {Invitation} from "../../data/user.ts";

interface InviteUserProps {
    onSuccess: (invitation: Invitation) => void;
    onError: (error: string) => void;
}

export const InviteUser = ({onSuccess, onError}: InviteUserProps) : React.JSX.Element => {
    const [email, setEmail] = useState("");

    const sendInvitation = async () => {
        const {institutionId} = getUserInfo();

        console.log(institutionId);
        await authenticatedClient.post("/api/invitations", {institutionId, email} )
            .then(() => onSuccess({createdAt: new Date().toDateString(), email: email, id: "", link: ""}))
            .catch(err => onError(err));
    }

    return (
        <Form onSubmit={sendInvitation}>
            <Input type="email" value={email} label="email" onChange={(e) => setEmail(e.target.value)}></Input>
            <Button>Invite</Button>
        </Form>
    )

}