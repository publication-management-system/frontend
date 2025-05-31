import React from "react";
import {Column, Table} from "../table/table.tsx";
import {Button} from "../button/button.tsx";
import {Card} from "../card/card.tsx";
import {ScrapingSession} from "../../data/scraping.ts";
import {useNavigate} from "react-router-dom";

interface ScrapingCardProps {
    institutionId: string;
    sessions: ScrapingSession[];
    onModalOpen: () => void;
}

export const ScrapingCard = (props: ScrapingCardProps): React.JSX.Element => {
    const columns: Column<ScrapingSession>[] = [
        { header: "First Name", accessor: "lastName" },
        { header: "Last Name", accessor: "firstName" },
        { header: "Profiler status", accessor: "status" },
    ];

    const navigate = useNavigate();

    return (
        <Card>
            <h1>My profiling sessions</h1>
            <div>
                <Button onClick={props.onModalOpen}>SCRAPE AUTHOR</Button>
            </div>
            <Table columns={columns} data={props.sessions} actions={(session) => (
                <Button onClick={() => navigate(`/app/institution-profiling/sessions/${session.id}`)}>View</Button>
            )}/>
        </Card>
    )
}