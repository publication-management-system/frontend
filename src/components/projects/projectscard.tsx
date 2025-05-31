import React from "react";
import {Column, Table} from "../table/table.tsx";
import {Card} from "../card/card.tsx";
import {Button} from "../button/button.tsx";
import {Project} from "../../data/project.ts";
import {useNavigate} from "react-router-dom";
import {Pageable} from "../page/pageable.tsx";
import {HiOutlineEye, HiOutlinePencil} from "react-icons/hi";
import './projectscard.css'

interface ProjectsCardProps {
    userId: string,
    projects: Project[],
    onModalOpen: () => void,
    onEditProject: (project: Project) => void,
    onPageChanged: (newPageNumber: number) => void,
    pageNumber: number,
    totalPages: number
}

const ProjectsCard = (props: ProjectsCardProps): React.JSX.Element => {
    const columns: Column<Project>[] = [
        {header: "Title", accessor: "title"},
        {header: "Description", accessor: "description"},
    ];

    const navigate = useNavigate();

    return (
        <Card>
            <h1>My ongoing projects</h1>
            <div>
                <Button onClick={props.onModalOpen}>Create new Project</Button>
            </div>

            <Table columns={columns} data={props.projects} actions={(project) => (
                <div className={'project-actions'}>
                    <HiOutlineEye onClick={() => navigate(`/app/institution-profiling/projects/${project.id}`)} />
                    <HiOutlinePencil onClick={() => props.onEditProject(project)} />
                </div>
            )}/>

            <Pageable pageNumber={props.pageNumber} totalPages={props.totalPages} onPageChange={props.onPageChanged} />
        </Card>
    )
}

export default ProjectsCard;