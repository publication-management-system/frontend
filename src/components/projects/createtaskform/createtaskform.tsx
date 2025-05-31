import React, {useState} from "react";
import {authenticatedClient} from "../../../data/client.ts";
import {Form} from "../../form/form.tsx";
import {Input} from "../../input/input.tsx";
import {Button} from "../../button/button.tsx";
import {Task} from "../../../data/project.ts";

interface Props {
    onSuccess: (task: Task) => void;
    onError(error: string): void;
    projectId: string;
}

export const CreateTaskForm = ({onSuccess, onError, projectId} : Props) : React.JSX.Element => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createTask = async () => {
        await authenticatedClient.post(`/api/tasks/${projectId}`, {title, description} )
            .then(response => onSuccess(response.data))
            .catch(err => onError(err));
    }

    return (
        <Form onSubmit={createTask}>
            <Input type="text" value={title} label="title" onChange={(e) => setTitle(e.target.value)}></Input>
            <Input type="text" value={description} label="description" onChange={(e) => setDescription(e.target.value)}></Input>
            <Button>Add new Task</Button>
        </Form>
    )
}