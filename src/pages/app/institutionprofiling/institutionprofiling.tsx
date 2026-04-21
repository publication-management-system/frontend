import React, {useState} from "react";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import './institutionprofiling.css'
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {ScrapeAuthorProfile} from "../../../components/profile/scrapeAuthorProfile.tsx";
import ScrapingQueueItemList from "../../../components/institutionprofiling/scraping-queue-item-list.tsx";
import {Button} from "../../../components/button/button.tsx";

export const InstitutionProfiling = (): React.JSX.Element => {

    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});

    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });

    const openScrapingModal = () => {
        openModal('Scrape author',
            <ScrapeAuthorProfile
                onSuccess={(resp) => {
                    setModalSettings({...modalSettings, open: false})
                    setToastSettings({...toastSettings, open: true, message: resp.status});
                }}
                onError={(error: string) => {
                    setToastSettings({...toastSettings, open: true, message: error, type: "error"});
                }}
            />
        )
    }

    const openModal = (title: string, bodyComponent: React.ReactNode) => {
        setModalSettings({
            open: true,
            title: title,
            bodyComponent: bodyComponent
        });
    };

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation/>
                <div className={'institution-profiling-page-contents content'} style={{paddingTop: '8%'}}>

                    <div className="institution-profiling-page-contents">
                        <div className="institution-profiling-page-contents-row">
                            <div className="institution-profiling-page-contents-col">
                                <Button onClick={openScrapingModal}>Enqueue Scraping</Button>
                            </div>
                            <ScrapingQueueItemList onRunning={() => {
                                setToastSettings({...toastSettings, open: true, message: "Running Scraping In Background"});
                            }} />
                        </div>
                    </div>

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