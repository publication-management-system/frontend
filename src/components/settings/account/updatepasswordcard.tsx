import React, {useState} from "react";
import {Input} from "../../input/input.tsx";
import {Button} from "../../button/button.tsx";
import {Card} from "../../card/card.tsx";
import {Form} from "../../form/form.tsx";
import {UpdatePassword} from "../../../data/user.ts";
import {authenticatedClient} from "../../../data/client.ts";

interface UpdatePasswordCardProps {
    userId: string;
    onSuccess: () => void;
    onError: (error: Error) => void;
}

const initialState = {confirmPassword: "", currentPassword: "", newPassword: ""};

export const UpdatePasswordCard = (props: UpdatePasswordCardProps): React.JSX.Element => {

    const [password, setPassword] = useState<UpdatePassword>(initialState);

    const changePassword = () => {
        authenticatedClient.patch(`/api/users/${props.userId}/password`, {...password})
            .then(() => {
                props.onSuccess()
                setPassword(initialState);
            })
            .catch((error) => {
                props.onError(error);
                setPassword(initialState);
            })
    }

    return (
        <Card className={"edit-details-card"}>
            <Form onSubmit={changePassword}>
                <h1>Credentials</h1>
                <Input value={password.currentPassword} type={'password'} label={'Current Password'} onChange={(val) => setPassword({...password, currentPassword: val.target.value})} />
                <Input value={password.newPassword} type={'password'} label={'New Password'} onChange={(val) => setPassword({...password, newPassword: val.target.value})} />
                <Input value={password.confirmPassword} type={'password'} label={'Confirm Password'} onChange={(val) => setPassword({...password, confirmPassword: val.target.value})} />
                <div>
                    <Button>Update credentials</Button>
                </div>
            </Form>
        </Card>
    )
}