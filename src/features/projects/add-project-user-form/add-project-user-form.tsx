import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/button/button";
import { Form } from "../../../components/form/form";
import { Input } from "../../../components/input/input";
import type { AddUserToProjectDto, ProjectUser } from "../../../data/project";
import { addProjectUser } from "../api";

import styles from "./add-project-user-form.module.css";

interface AddProjectUserFormProps {
    onUserAdded: (newProject: ProjectUser) => void;
    projectId: string;
}

export function AddProjectUserForm({ onUserAdded, projectId }: AddProjectUserFormProps): React.JSX.Element {
    const { register, handleSubmit, reset } = useForm();
    const [isFormVisible, setFormVisible] = useState<boolean>(false);

    const onNewUserAdd = async (data: FieldValues) => {
        const requestDto: AddUserToProjectDto = {
            email: data.email,
            projectId,
        };
        const projectUser = await addProjectUser(requestDto);
        setFormVisible(false);
        reset();
        onUserAdded(projectUser);
    };

    return (
        <div className={styles.createNewProjectContainer}>
            {!isFormVisible && (
                <Button
                    onClick={() => {
                        setFormVisible(true);
                    }}
                >
                    Add a new user
                </Button>
            )}

            {isFormVisible && (
                <Form onSubmit={handleSubmit(onNewUserAdd)} className={styles.newProjectForm}>
                    <Input label="Email" type="email" required={true} {...register("email")} />

                    <div className={styles.formActions}>
                        <Button
                            type="reset"
                            onClick={() => {
                                reset();
                                setFormVisible(false);
                            }}
                        >
                            Clear
                        </Button>

                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            )}
        </div>
    );
}
