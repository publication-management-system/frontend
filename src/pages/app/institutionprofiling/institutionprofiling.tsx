import React, {useEffect, useState} from "react";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import './institutionprofiling.css'
import {ScrapingCard} from "../../../components/institutionprofiling/scrapingcard.tsx";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {ScrapeAuthorProfile} from "../../../components/profile/scrapeAuthorProfile.tsx";
import {Tab, Tabs} from "../../../components/tabs/tabs.tsx";
import ProjectsCard from "../../../components/projects/projectscard.tsx";
import {CreateProjectForm} from "../../../components/projects/createprojectform/createprojectform.tsx";
import {ScrapingSession} from "../../../data/scraping.ts";
import {authenticatedClient} from "../../../data/client.ts";
import {PagedProject, Project} from "../../../data/project.ts";
import {LoadingCard} from "../../../components/settings/account/loadingcard/loadingcard.tsx";
import {EditProjectForm} from "../../../components/projects/editprojectform/editprojectform.tsx";

export const InstitutionProfiling = (): React.JSX.Element => {

    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});
    const [sessions, setSessions] = useState<ScrapingSession[]>([]);
    const [projects, setProjects] = useState<PagedProject>({
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        loading: true,
        entities: []
    });

    const institutionId = getUserInfo()?.institutionId;
    const userId = getUserInfo()?.userId;
    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });

    const openScrapingModal = () => {
        openModal('Scrape author', <ScrapeAuthorProfile
            onSuccess={() => {
                setModalSettings({...modalSettings, open: false})
                setToastSettings({...toastSettings, open: true, message: "Scraping started"});
            }}
            onError={(error: string) => {
                setToastSettings({...toastSettings, open: true, message: error, type: "error"});
            }}
        />)
    }

    const openProjectsCardModal = () => {
        openModal('Add new Project', <CreateProjectForm
            onSuccess={(project: Project) => {
                setModalSettings({...modalSettings, open: false})
                setToastSettings({...toastSettings, open: true, message: "Project created successfully."});
                setProjects({...projects, entities: [project, ...(
                        projects.entities.length + 1 > 10
                            ? projects.entities.slice(0, -1)
                            : projects.entities
                    )]});
            }}
            onError={(error: string) => {
                setToastSettings({...toastSettings, open: true, message: error, type: "error"});
            }}
        />);
    }

    const openProjectsCardModalEdit = (project: Project) => {
        openModal('Edit Project', <EditProjectForm
            project={project}
            onSuccess={(project: Project) => {
                setModalSettings({...modalSettings, open: false})
                setToastSettings({...toastSettings, open: true, message: "Project created successfully."});
                setProjects({...projects, entities: projects.entities.map(p =>
                        p.id === project.id ? project : p
                    )});
            }}
            onError={(error: string) => {
                setToastSettings({...toastSettings, open: true, message: error, type: "error"});
            }}
        />);
    }

    const openModal = (title: string, bodyComponent: React.ReactNode) => {
        setModalSettings({
            open: true,
            title: title,
            bodyComponent: bodyComponent
        });
    };

    const fetchScrapingSessions = async () => {
        await authenticatedClient.get(`/api/scraping-sessions/institution/${institutionId}`)
            .then(response => setSessions(response.data))
            .catch((error) => setToastSettings({...toastSettings, open: true, message: error, type: "error"}));
    }

    const fetchProjects = async (pageNumber: number) => {
        await authenticatedClient.get(`/api/projects/user/${userId}?pageNumber=${pageNumber}&pageSize=10`)
            .then(response => setProjects({
                pageNumber: response?.data?.pageable?.pageNumber ?? 0,
                totalElements: response?.data?.totalElements ?? 0,
                totalPages: response?.data?.totalPages ?? 0,
                loading: false,
                entities: response.data.content
            }))
            .catch((error) => setToastSettings({...toastSettings, open: true, message: error, type: "error"}));
    }

    useEffect(() => {
        fetchScrapingSessions();
    }, []);
    useEffect(() => {
        fetchProjects(projects.pageNumber ?? 0);
    }, []);


    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation/>
                <div className={'institution-profiling-page-contents content'} style={{paddingTop: '8%'}}>
                    <Tabs>
                        <Tab label={'Author scraping'}>
                            <>
                                <div className="institution-profiling-page-contents">
                                    <div className="institution-profiling-page-contents-row">
                                        <div className="content">
                                            <ScrapingCard institutionId={institutionId}
                                                          sessions={sessions}
                                                          onModalOpen={openScrapingModal}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Tab>
                        <Tab label={'My Projects'}>
                            <>
                                <div className="institution-profiling-page-contents">
                                    <div className="institution-profiling-page-contents-row">
                                        <div className="content">
                                            {
                                                projects.loading ? <LoadingCard/>
                                                    : <ProjectsCard userId={getUserInfo()?.userId}
                                                                    projects={projects.entities}
                                                                    onModalOpen={openProjectsCardModal}
                                                                    onEditProject={openProjectsCardModalEdit}
                                                                    onPageChanged={(newPageNumber: number) => fetchProjects(newPageNumber)}
                                                                    pageNumber={projects?.pageNumber ?? 0}
                                                                    totalPages={projects?.totalPages ?? 0}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Tab>
                    </Tabs>
                </div>
            </AuthenticatedLayout>
            <Toast open={toastSettings.open}
                   onToastClose={() => {
                       setToastSettings({...toastSettings, open: false})
                   }}
                   message={toastSettings.message}
                   type={toastSettings.type}
            />
            <Modal title={modalSettings.title}
                   open={modalSettings.open}
                   children={modalSettings.bodyComponent}
                   onClose={() => setModalSettings({...modalSettings, open: false})}
            />
        </>
    )
}