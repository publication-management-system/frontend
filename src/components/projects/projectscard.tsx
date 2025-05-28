import React, {useEffect, useState} from "react";
import {Column, Table} from "../table/table.tsx";
import {authenticatedClient} from "../../data/client.ts";
import {Card} from "../card/card.tsx";
import {Button} from "../button/button.tsx";
import {Project} from "../../data/project.ts";

interface ProjectsCardProps {
    userId: string;
    onError(error: string): void;
    onModalOpen: () => void;
}

const ProjectsCard = (props: ProjectsCardProps): React.JSX.Element => {
    const columns: Column<Project>[] = [
        { header: "Title", accessor: "title" },
        { header: "Description", accessor: "description" },
    ];

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            await authenticatedClient.get(`/api/projects/user/${props.userId}`)
                .then(response => setProjects(response.data))
                .catch((error) => props.onError(error));
        }
        fetchProjects();
    }, []);

    return (
        <Card>
            <h1>My ongoing projects</h1>

            <Table columns={columns} data={projects} actions={(project) => (
                <Button onClick={() => alert(project.id)}>View</Button>
            )}/>

            <div>
                <Button onClick={props.onModalOpen}>Create new Project</Button>
            </div>
        </Card>
    )
}

export default ProjectsCard;