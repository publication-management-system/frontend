import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/button/button";
import { Form } from "../../../components/form/form";
import { Input } from "../../../components/input/input";
import { Textarea } from "../../../components/text-area/text-area";
import type { CreateNewTaskDto, Task } from "../../../data/project";
import { createNewTask } from "../api";

import styles from "./create-new-task-form.module.css";

interface CreateNewTaskForm {
    projectId: string;
    onTaskAdded: (newTask: Task) => void;
}

export function CreateNewTaskForm({ onTaskAdded, projectId }: CreateNewTaskForm): React.JSX.Element {
    const { register, handleSubmit, reset } = useForm();
    const [isFormVisible, setFormVisible] = useState<boolean>(false);

    const onNewTaskSubmit = async (data: FieldValues) => {
        const requestDto: CreateNewTaskDto = {
            title: data.title,
            description: data.description,
        };
        const task = await createNewTask(requestDto, projectId);
        setFormVisible(false);
        onTaskAdded(task);
    };

    return (
        <div className={styles.container}>
            {!isFormVisible && (
                <Button
                    onClick={() => {
                        setFormVisible(true);
                    }}
                >
                    New Task
                </Button>
            )}

            {isFormVisible && (
                <Form onSubmit={handleSubmit(onNewTaskSubmit)} className={styles.taskForm}>
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
