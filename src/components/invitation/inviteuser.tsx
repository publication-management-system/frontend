import React, {useState} from "react";
import {Button} from "../button/button.tsx";
import {authenticatedClient} from "../../data/client.ts";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {Form} from "../form/form.tsx";
import {Input} from "../input/input.tsx";

export const InviteUser =() : React.JSX.Element => {
    const [email, setEmail] = useState("");

    const sendInvitation = async () => {
        const {institutionId} = getUserInfo();

        console.log(institutionId);
        await authenticatedClient.post("/api/invitations", {institutionId, email} )
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    return (
        <Form onSubmit={sendInvitation}>
            <Input type="email" value={email} label="email" onChange={(e) => setEmail(e.target.value)}></Input>
            <Button>Invite</Button>
        </Form>
    )

}