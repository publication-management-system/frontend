import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/button/button";
import { Editor } from "../../../components/editor/editor";
import { Form } from "../../../components/form/form";
import type { CreateTaskResourceDto, UpdateTaskResourceDto } from "../../../data/project";
import { saveTaskResource, updateTaskResource } from "../api";

import styles from "./task-document-form.module.css";

export default function TaskDocumentForm({
    taskId,
    taskName,
    data,
    resourceId,
}: {
    taskId: string;
    taskName: string;
    data?: string;
    resourceId?: string;
}): React.JSX.Element {
    const [hasData, setHasData] = useState<boolean>(resourceId !== undefined);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            data,
        },
    });

    const saveMainDocument = async (values: FieldValues) => {
        if (!hasData) {
            const request: CreateTaskResourceDto = {
                resourceType: "RICH_TEXT",
                resourceName: `Document ${taskName}`,
                data: values.data,
            };
            await saveTaskResource(taskId, request);
            setHasData(true);
        } else {
            if (!resourceId) {
                return;
            }
            const request: UpdateTaskResourceDto = {
                resourceName: `Document ${taskName}`,
                data: values.data,
            };
            await updateTaskResource(taskId, resourceId, request);
        }
    };

    return (
        <Form className={styles.form} onSubmit={handleSubmit(saveMainDocument)}>
            <Controller
                name="data"
                control={control}
                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
            />

            <div className={styles.formAction}>
                <Button type={"submit"}>Save</Button>
            </div>
        </Form>
    );
}
