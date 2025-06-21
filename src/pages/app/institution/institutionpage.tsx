import React, {useEffect, useState} from "react";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {InviteUser} from "../../../components/invitation/inviteuser.tsx";
import './institutionpage.css';
import {Tab, Tabs} from "../../../components/tabs/tabs.tsx";
import {InstitutionUsersTab} from "../../../components/institution/institutionuserstab.tsx";
import {InstitutionInvitationTab} from "../../../components/institution/institutioninvitationtab.tsx";
import {Invitation} from "../../../data/user.ts";
import {authenticatedClient} from "../../../data/client.ts";


export const InstitutionPage = (): React.JSX.Element => {
    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});
    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });
    const [invitations, setInvitations] = useState<Invitation[]>([]);

    const onInviteUser = async (invitation: Invitation): Promise<void> => {
        setToastSettings({open: true, message: "Success sending invitation", type: "success"});
        setModalSettings({...modalSettings, open: false});
        setInvitations([...invitations, invitation]);
    }

    const onInviteUserError = async (error: string): Promise<void> => {
        setToastSettings({open: true, message: error, type: "error"});
        setModalSettings({...modalSettings, open: false});
    }

    function openModalInviteUsers() {
        setModalSettings({
            open: true,
            title: 'Invite users to your institution',
            bodyComponent: (<InviteUser onSuccess={onInviteUser} onError={onInviteUserError} />)
        });
    }

    const onInstUserError = (error: string) => {
        setToastSettings({...toastSettings, open: true, message: error, type: "error"});
    }

    const fetchInvitations = async () => {
        await authenticatedClient.get(`/api/invitations`)
            .then(response => setInvitations(response.data))
            .catch((error) => onInstUserError(error));
    }

    useEffect(() => {
        fetchInvitations();
    }, []);


    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation />
                <div className={'institution-page-contents content'} style={{paddingTop: '8%'}}>
                    <Tabs>
                        <Tab label={'Institution Overview'}>
                            <InstitutionUsersTab onModalOpen={openModalInviteUsers} onError={onInstUserError}/>
                        </Tab>
                        <Tab label={'Invitations'}>
                            <InstitutionInvitationTab onModalOpen={openModalInviteUsers} invitations={invitations} />
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