import {UserName} from "../../../data/user.ts";
import {Card} from "../../card/card.tsx";
import {Input} from "../../input/input.tsx";
import {Button} from "../../button/button.tsx";
import {useState} from "react";
import {Form} from "../../form/form.tsx";
import {authenticatedClient} from "../../../data/client.ts";

interface AccountDetailsProps {
    user: UserName,
    userId: string,
    onSuccess: (newName: UserName) => void,
    onError: (error: Error) => void,
}

export const AccountDetailsCard = (props: AccountDetailsProps) => {
    const [userName, setUserName] = useState({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        middleName: props.user.middleName,
    });

    const updateName = async () => {
        await authenticatedClient.patch(`/api/users/${props.userId}/name`, {
            firstName: userName.firstName,
            lastName: userName.lastName,
            middleName: userName.middleName,
        }).then(() => {props.onSuccess(userName)})
            .catch(err => {props.onError(err);})
    }

    return (
        <Card className={`edit-details-card`}>
            <Form onSubmit={updateName}>
                <h1>Your details</h1>
                <Input value={userName.firstName} label={"First name"}
                       onChange={(newVal) => setUserName({...userName, firstName: newVal.target.value})}/>
                <Input value={userName.middleName ?? ''} label={"Middle name"}
                       onChange={(newVal) => setUserName({...userName, middleName: newVal.target.value})}/>
                <Input value={userName.lastName} label={"Last name"}
                       onChange={(newVal) => setUserName({...userName, lastName: newVal.target.value})}/>
                <div>
                    <Button>Update details</Button>
                </div>
            </Form>
        </Card>
    );
}