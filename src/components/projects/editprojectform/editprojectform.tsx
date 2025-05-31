import React, {useState} from "react";
import {authenticatedClient} from "../../../data/client.ts";
import {Form} from "../../form/form.tsx";
import {Input} from "../../input/input.tsx";
import {Button} from "../../button/button.tsx";
import {Project} from "../../../data/project.ts";

interface Props {
    project: Project;
    onSuccess: (scrapingSession: Project) => void;
    onError(error: string): void;
}

export const EditProjectForm = ({onSuccess, onError, project} : Props) : React.JSX.Element => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);

    const editProject = async () => {
        await authenticatedClient.patch(`/api/projects/${project.id}/edit`, {title, description} )
            .then(response => onSuccess(response.data))
            .catch(err => onError(err));
    }

    return (
        <Form onSubmit={editProject}>
            <Input type="text" value={title} label="New Title" onChange={(e) => setTitle(e.target.value)}></Input>
            <Input type="text" value={description} label="New Description" onChange={(e) => setDescription(e.target.value)}></Input>
            <Button>Save Changes</Button>
        </Form>
    )
}