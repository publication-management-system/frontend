import React, {useEffect, useState} from "react";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {UserData} from "../../../data/user.ts";
import {authenticatedClient} from "../../../data/client.ts";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import './profilingpage.css'
import {ScrapingCard} from "../../../components/institutionprofiling/scrapingcard.tsx";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {ScrapeAuthorProfile} from "../../../components/profile/scrapeAuthorProfile.tsx";

export const ProfilingPage = (): React.JSX.Element => {

    const [currentUser, setCurrentUser] = useState<UserData>({loadingUser: true, user: undefined});
    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});

    const institutionId = getUserInfo()?.institutionId;
    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });

    const loadCurrentUser = async (): Promise<void> => {
        const resp = await authenticatedClient.get(`/api/users/${getUserInfo().userId}`)
            .then(response => response.data);

        setCurrentUser({loadingUser: false, user: {...resp}});
    }

    const onScrapingCardError = (error: string) => {
        setToastSettings({...toastSettings, open: true, message: error, type: "error"});
    }

    useEffect(() => {
        loadCurrentUser();
    }, [])

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
                <AuthenticatedNavigation loading={currentUser.loadingUser} user={currentUser.user} />
                <div className="profilingpage-contents">
                    <div className="profilingpage-contents-row">
                        <div className="content">
                            <ScrapingCard institutionId={institutionId}
                                          onError={onScrapingCardError}
                                          onModalOpen={openModalScrapeAuthor} />
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