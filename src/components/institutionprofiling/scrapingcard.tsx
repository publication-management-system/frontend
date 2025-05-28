import React, {useEffect, useState} from "react";
import {Column, Table} from "../table/table.tsx";
import {Button} from "../button/button.tsx";
import {Card} from "../card/card.tsx";
import {ScrapingSession} from "../../data/scraping.ts";
import {authenticatedClient} from "../../data/client.ts";
import {useNavigate} from "react-router-dom";

interface ScrapingCardProps {
    institutionId: string;
    onModalOpen: () => void;
    onError(error: string): void;
}

export const ScrapingCard = (props: ScrapingCardProps): React.JSX.Element => {

    const columns: Column<ScrapingSession>[] = [
        { header: "First Name", accessor: "lastName" },
        { header: "Last Name", accessor: "firstName" },
        { header: "Profiler status", accessor: "status" },
    ];

    const [sessions, setSessions] = useState<ScrapingSession[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchScrapingSessions = async () => {
            await authenticatedClient.get(`/api/scraping-sessions/institution/${props.institutionId}`)
                .then(response => setSessions(response.data))
                .catch((error) => props.onError(error));
            console.log('fetchScrapingSessions');
        }
        fetchScrapingSessions();
    }, []);

    return (
        <Card>
            <div>
                <Button onClick={props.onModalOpen}>SCRAPE AUTHOR</Button>
            </div>
            <h1>My profiling sessions</h1>
            <Table columns={columns} data={sessions} actions={(session) => (
                <Button onClick={() => navigate(`/app/profiling/sessions/${session.id}`)}>View</Button>
            )}/>
        </Card>
    )
}