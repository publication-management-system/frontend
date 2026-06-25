import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/button/button";
import { Form } from "../../../components/form/form";
import { Input } from "../../../components/input/input";
import { Textarea } from "../../../components/text-area/text-area";
import { getUserInfo } from "../../../data/accesstokenutil";
import type { CreateNewProjectDto, Project } from "../../../data/project";
import { createNewProject } from "../api";

import styles from "./create-new-project-form.module.css";

interface CreateNewProjectFormProps {
    onProjectAdded: (newProject: Project) => void;
}

export function CreateNewProjectForm({ onProjectAdded }: CreateNewProjectFormProps): React.JSX.Element {
    const userInfo = getUserInfo();

    const { register, handleSubmit, reset } = useForm();
    const [isFormVisible, setFormVisible] = useState<boolean>(false);

    const onNewProjectSubmit = async (data: FieldValues) => {
        const requestDto: CreateNewProjectDto = {
            title: data.title,
            description: data.description,
        };
        const project = await createNewProject(requestDto, userInfo.userId);
        setFormVisible(false);
        onProjectAdded(project);
    };

    return (
        <div className={styles.createNewProjectContainer}>
            {!isFormVisible && (
                <Button
                    onClick={() => {
                        setFormVisible(true);
                    }}
                >
                    New Project
                </Button>
            )}

            {isFormVisible && (
                <Form onSubmit={handleSubmit(onNewProjectSubmit)} className={styles.newProjectForm}>
                    <Input label="Title" type="text" required={true} {...register("title")} />

                    <Textarea label="Description" required={true} {...register("description")} />

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
