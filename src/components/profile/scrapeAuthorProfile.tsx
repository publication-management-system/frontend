import React, { useState } from "react";

import { getUserInfo } from "../../data/accesstokenutil.ts";
import { authenticatedClient } from "../../data/client.ts";
import type { ScrapingStatusResponse } from "../../data/scraping.ts";
import { Button } from "../button/button.tsx";
import { Form } from "../form/form.tsx";
import { Input } from "../input/input.tsx";

interface Props {
    onSuccess: (statusResponse: ScrapingStatusResponse) => void;
    onError(error: string): void;
}

export const ScrapeAuthorProfile = ({ onSuccess, onError }: Props): React.JSX.Element => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const institutionId = getUserInfo().institutionId;
    const userId = getUserInfo().userId;
    const userName = getUserInfo().name;

    const scrapeProfile = async () => {
        await authenticatedClient
            .post("/api/scraping/enqueue", { firstName, lastName, institutionId, userId, userName })
            .then((response) => {
                onSuccess({ ...response.data });
            })
            .catch((err) => {
                onError(err);
            });
    };

    return (
        <Form onSubmit={scrapeProfile}>
            <Input
                type="text"
                value={firstName}
                label="firstName"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}
            ></Input>
            <Input
                type="text"
                value={lastName}
                label="lastName"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}
            ></Input>
            <Button>Scrape</Button>
        </Form>
    );
};
