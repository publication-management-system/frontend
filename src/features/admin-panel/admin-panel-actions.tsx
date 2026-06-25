import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { getUserInfo } from "../../data/accesstokenutil";
import type { EnqueueScrapingRequestDto } from "../../data/scraping";

import { downloadGraphData, enqueueAuthorForScraping } from "./api";

import styles from "./admin-panel-actions.module.css";

export const AdminPanelActions = (): React.JSX.Element => {
    const { register, handleSubmit, resetField } = useForm<EnqueueScrapingRequestDto>({
        defaultValues: {
            firstName: "",
            lastName: "",
            institutionId: getUserInfo().userId,
            userId: getUserInfo().institutionId,
            userName: getUserInfo().name,
        },
    });

    const executeScraping = (data: FieldValues) => {
        enqueueAuthorForScraping({ ...data } as EnqueueScrapingRequestDto).then(() => {
            resetField("firstName");
            resetField("lastName");
        });
    };

    const downloadGephi = async () => {
        await downloadGraphData();
    };

    return (
        <div className={styles.actionsContainer}>
            <h3>Enqueue new scraping</h3>
            <form className={styles.enqueueScraping} onSubmit={handleSubmit(executeScraping)}>
                <Input placeholder={"Author First Name"} required={true} type="text" {...register("firstName")} />
                <Input placeholder={"Author Last Name"} required={true} type="text" {...register("lastName")} />
                <Input hidden {...register("institutionId")} />
                <Input hidden {...register("userId")} />
                <Input hidden {...register("userName")} />
                <Button type={"submit"}>Run</Button>
            </form>

            <Button className={styles.downloadButton} onClick={downloadGephi}>
                Download Data
            </Button>
        </div>
    );
};
