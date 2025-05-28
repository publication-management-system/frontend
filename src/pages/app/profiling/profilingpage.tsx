import React, {useState} from "react";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import './profilingpage.css'
import {ScrapingCard} from "../../../components/institutionprofiling/scrapingcard.tsx";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {ScrapeAuthorProfile} from "../../../components/profile/scrapeAuthorProfile.tsx";
import {Tab, Tabs} from "../../../components/tabs/tabs.tsx";
import ProjectsCard from "../../../components/projects/projectscard.tsx";
import {CreateProjectForm} from "../../../components/projects/createprojectform/createprojectform.tsx";

export const ProfilingPage = (): React.JSX.Element => {

    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});

    const institutionId = getUserInfo()?.institutionId;
    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });

    const onScrapingCardError = (error: string) => {
        setToastSettings({...toastSettings, open: true, message: error, type: "error"});
    }

    const onProjectLoadError = (error: string) => {
        setToastSettings({...toastSettings, open: true, message: error, type: "error"});
    }

    function openModal(title: string, bodyComponent: React.ReactNode) {
        setModalSettings({
            open: true,
            title: title,
            bodyComponent: bodyComponent
        });
    }

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation/>
                <div className={'profilingpage-contents content'} style={{paddingTop: '10%'}}>
                    <Tabs>
                        <Tab label={'Author scraping'}>
                            <>
                                <div className="profilingpage-contents">
                                    <div className="profilingpage-contents-row">
                                        <div className="content">
                                            <ScrapingCard institutionId={institutionId}
                                                          onError={onScrapingCardError}
                                                          onModalOpen={() => openModal('Scrape author', <ScrapeAuthorProfile/>)}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Tab>
                        <Tab label={'My Projects'}>
                            <>
                                <div className="profilingpage-contents">
                                    <div className="profilingpage-contents-row">
                                        <div className="content">
                                            <ProjectsCard userId={getUserInfo()?.userId}
                                                          onError={onProjectLoadError}
                                                          onModalOpen={() => openModal('Add new Project', <CreateProjectForm/>)}
                                            />
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