import React, {useEffect, useState} from "react";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {authenticatedClient} from "../../../data/client.ts";
import {useParams} from "react-router-dom";
import {ScrapingSession} from "../../../data/scraping.ts";
import {Card} from "../../../components/card/card.tsx";
import {Tab, Tabs} from "../../../components/tabs/tabs.tsx";
import {
    AuthorScrapedProfile,
    LoadingAuthorScrapedProfile
} from "../../../components/profiling/author-scraped-profile.tsx";
import {AuthorDocumentsProfile} from "../../../components/profiling/author-documents-profile.tsx";


export const SessionPage = (): React.JSX.Element => {

    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});
    const {sessionId} = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<ScrapingSession>();

    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });

    useEffect(() => {
        const fetchScrapingSessions = async () => {
            await authenticatedClient.get(`/api/scraping-sessions/${sessionId}`)
                .then(response => setSession(response.data))
                .catch((error) => setToastSettings({...toastSettings, open: true, message: error, type: "error"}));
            console.log('fetchScrapingSessions');
        }
        fetchScrapingSessions();
    }, []);
    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation/>
                <div className={'sessionpage-contents content'} style={{paddingTop: '8%'}}>
                    <Tabs>
                        <Tab label={'Google scholar'}>
                            <>
                                <Card>
                                    <h1>Google scholar results for {session?.firstName} {session?.lastName}</h1>
                                    {
                                        sessionId ? (
                                            <AuthorScrapedProfile sessionId={session?.id ?? ''}
                                                                  dataSource={'google_scholar'}
                                                                  onError={() => {}} />
                                        ) : (
                                            <LoadingAuthorScrapedProfile />
                                        )
                                    }

                                    <AuthorDocumentsProfile sessionId={sessionId ?? ''} dataSource={'google_scholar'} onError={() => {}}  />
                                </Card>
                            </>
                        </Tab>
                        <Tab label={'DBLP'}>
                            <>
                                <Card>
                                    <h1>DBLP results {session?.firstName} {session?.lastName}</h1>
                                    {
                                        sessionId ? (
                                            <AuthorScrapedProfile sessionId={session?.id ?? ''}
                                                                  dataSource={'dblp'}
                                                                  onError={() => {}} />
                                        ) : (
                                            <LoadingAuthorScrapedProfile />
                                        )
                                    }

                                    <AuthorDocumentsProfile sessionId={sessionId ?? ''} dataSource={'dblp'} onError={() => {}}  />
                                </Card>
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