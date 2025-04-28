import React, {useEffect, useState} from "react";
import {InstitutionData, UserData} from "../../../data/user.ts";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {authenticatedClient} from "../../../data/client.ts";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {InviteUser} from "../../../components/invitation/inviteuser.tsx";
import './institutionpage.css';
import {Tab, Tabs} from "../../../components/tabs/tabs.tsx";
import {InstitutionUsersTab} from "../../../components/institution/institutionuserstab.tsx";
import {InstitutionInvitationTab} from "../../../components/institution/institutioninvitationtab.tsx";


export const InstitutionPage = (): React.JSX.Element => {
    const [currentUser, setCurrentUser] = useState<UserData>({loadingUser: true, user: undefined});

    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});
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

    function openModalInviteUsers() {
        setModalSettings({
            open: true,
            title: 'Invite users to your institution',
            bodyComponent: (<InviteUser/>)
        });
    }

    useEffect(() => {
        loadCurrentUser();
    }, [])

    const onInstUserError = (error: string) => {
        setToastSettings({...toastSettings, open: true, message: error, type: "error"});
    }

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation loading={currentUser.loadingUser} user={currentUser.user}/>
                <div className={'institution-page-contents content'}>
                    <Tabs>
                        <Tab label={'Institution Overview'}>
                            <InstitutionUsersTab onModalOpen={openModalInviteUsers} onError={onInstUserError}/>
                        </Tab>
                        <Tab label={'Invitations'}>
                            <InstitutionInvitationTab onError={onInstUserError} />
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