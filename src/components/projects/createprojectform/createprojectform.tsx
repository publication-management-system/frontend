import React, { useState } from "react";

import { getUserInfo } from "../../../data/accesstokenutil.ts";
import { authenticatedClient } from "../../../data/client.ts";
import type { Project } from "../../../data/project.ts";
import { Button } from "../../button/button.tsx";
import { Form } from "../../form/form.tsx";
import { Input } from "../../input/input.tsx";

interface Props {
    onSuccess: (scrapingSession: Project) => void;
    onError(error: string): void;
}

export const CreateProjectForm = ({ onSuccess, onError }: Props): React.JSX.Element => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const userId = getUserInfo().userId;

    const createProject = async () => {
        await authenticatedClient
            .post(`/api/projects?userId=${userId}`, { title, description })
            .then((response) => {
                onSuccess(response.data);
            })
            .catch((err) => {
                onError(err);
            });
    };

    return (
        <Form onSubmit={createProject}>
            <Input
                type="text"
                value={title}
                label="title"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></Input>
            <Input
                type="text"
                value={description}
                label="description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            ></Input>
            <Button>Create new Project</Button>
        </Form>
    );
};
