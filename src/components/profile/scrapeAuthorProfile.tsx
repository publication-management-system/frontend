import React, {useState} from "react";
import {Button} from "../button/button.tsx";
import {authenticatedClient} from "../../data/client.ts";
import {Form} from "../form/form.tsx";
import {Input} from "../input/input.tsx";
import {getUserInfo} from "../../data/accesstokenutil.ts";

export const ScrapeAuthorProfile = () : React.JSX.Element => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const institutionId = getUserInfo().institutionId;
    const userId = getUserInfo().userId;
    const userName = getUserInfo().name;

    const scrapeProfile = async () => {
        await authenticatedClient.post("/api/scraping-sessions", {firstName, lastName, institutionId, userId, userName} )
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    return (
        <Form onSubmit={scrapeProfile}>
            <Input type="text" value={firstName} label="firstName" onChange={(e) => setFirstName(e.target.value)}></Input>
            <Input type="text" value={lastName} label="lastName" onChange={(e) => setLastName(e.target.value)}></Input>
            <Button>Scrape</Button>
        </Form>
    )

}