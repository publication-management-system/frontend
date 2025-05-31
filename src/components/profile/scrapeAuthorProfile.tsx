import React, {useState} from "react";
import {Button} from "../button/button.tsx";
import {authenticatedClient} from "../../data/client.ts";
import {Form} from "../form/form.tsx";
import {Input} from "../input/input.tsx";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {ScrapingSession} from "../../data/scraping.ts";

interface Props {
    onSuccess: (scrapingSession: ScrapingSession) => void;
    onError(error: string): void;
}

export const ScrapeAuthorProfile = ({onSuccess, onError} : Props) : React.JSX.Element => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const institutionId = getUserInfo().institutionId;
    const userId = getUserInfo().userId;
    const userName = getUserInfo().name;

    const scrapeProfile = async () => {
        await authenticatedClient.post("/api/scraping-sessions", {firstName, lastName, institutionId, userId, userName} )
            .then(response => {
                onSuccess({
                    id: response?.data?.sessionId,
                    institutionId: institutionId,
                    firstName: firstName,
                    lastName: lastName,
                    status: "IN_PROGRESS",
                    userId: userId
                })
            })
            .catch(err => {
                onError(err);
            });
    }

    return (
        <Form onSubmit={scrapeProfile}>
            <Input type="text" value={firstName} label="firstName" onChange={(e) => setFirstName(e.target.value)}></Input>
            <Input type="text" value={lastName} label="lastName" onChange={(e) => setLastName(e.target.value)}></Input>
            <Button>Scrape</Button>
        </Form>
    )

}