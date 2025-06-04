import React, {useEffect, useState} from "react";
import {Card} from "../card/card.tsx";
import './projects-list.css'
import {Project} from "../../data/project.ts";
import {authenticatedClient} from "../../data/client.ts";
import {HiArrowRight} from "react-icons/hi";
import {useNavigate} from "react-router-dom";

interface ProjectListProps {
    userId: string;
    onError: (error: Error) => void;
}

export const ProjectsList = ({userId, onError} : ProjectListProps): React.JSX.Element => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            await authenticatedClient.get(`/api/projects/user/${userId}?pageNumber=0&pageSize=4`)
                .then(response => {
                    setProjects(response.data?.content ?? [])
                    setIsLoading(false);
                })
                .catch((error) => onError(error));
        }

        fetchProjects();
    }, [])

    return (
        <>
            {isLoading && <Card className="my-projects-cards loading_bg_skeleton"></Card>}
            {!isLoading && <div className="my-projects">
                {projects.map((project: Project) => (
                    <div key={project.id} className="projects-list-item">
                        <div className={'projects-list-item-details'}>
                            <span className="project-title">{project.title}</span>
                            <span className="project-desc">{project.description}</span>
                        </div>
                        <HiArrowRight className="project-icon" onClick={() => navigate(`/app/institution-profiling/projects/${project.id}`)}/>
                    </div>
                ))}
            </div>
            }
        </>


    )
}