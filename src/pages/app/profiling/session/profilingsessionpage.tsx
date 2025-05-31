import React, {useState} from "react";
import {Toast, ToastSettings} from "../../../../components/toast/toast.tsx";
import {getUserInfo} from "../../../../data/accesstokenutil.ts";
import {Modal, ModalSettings} from "../../../../components/modal/modal.tsx";
import {ScrapeAuthorProfile} from "../../../../components/profile/scrapeAuthorProfile.tsx";
import {AuthenticatedLayout} from "../../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {ScrapingCard} from "../../../../components/institutionprofiling/scrapingcard.tsx";

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

    function openModalScrapeAuthor() {
        setModalSettings({
            open: true,
            title: 'Scrape author profile',
            bodyComponent: (<ScrapeAuthorProfile/>)
        });
    }

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation />
                <div className="profilingpage-contents">
                    <div className="profilingpage-contents-row">
                        <div className="content">
                            <ScrapingCard institutionId={institutionId}
                                          onError={onScrapingCardError}
                                          onModalOpen={openModalScrapeAuthor}/>
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