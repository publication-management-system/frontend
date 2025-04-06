import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import React, {useEffect, useState} from "react";
import {authenticatedClient} from "../../../data/client.ts";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import {UserData, UserName} from "../../../data/user.ts";
import './settingspage.css'
import {Card} from "../../../components/card/card.tsx";
import {ProfileImage} from "../../../components/profile/profileimage.tsx";
import {AccountDetailsCard} from "../../../components/settings/account/accountdetailscard.tsx";
import {LoadingCard} from "../../../components/settings/account/loadingcard/loadingcard.tsx";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {UpdatePasswordCard} from "../../../components/settings/account/updatepasswordcard.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {UploadProfileImage} from "../../../components/settings/account/uploadprofileimage/uploadprofileimage.tsx";


export const SettingsPage = (): React.JSX.Element => {

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

        console.log(resp);

        setCurrentUser({loadingUser: false, user: {...resp}});
    }

    useEffect(() => {
        loadCurrentUser();
    }, [])

    const getUserName = (): UserName => {
        return {
            firstName: currentUser.user?.firstName ?? '',
            lastName: currentUser.user?.lastName ?? '',
            middleName: currentUser.user?.middleName ?? ''
        };
    }

    const errorMessage = (): ToastSettings => {
        return {open: true, message: 'Could not update user', type: 'error'};
    }

    const successMessage = (): ToastSettings => {
        return {open: true, message: 'User details updated', type: 'success'};
    }

    const onSuccessUpdateDetails = (newName: UserName): void => {
        if (currentUser.user) {
            setCurrentUser({
                ...currentUser,
                user: {
                    ...currentUser.user,
                    firstName: newName.firstName,
                    lastName: newName.lastName,
                    middleName: newName.middleName
                }
            });
        }
        setToastSettings(successMessage());
    }

    function openModalUploadProfileImage() {
        setModalSettings({
            open: true,
            title: 'Upload your image',
            bodyComponent: (<UploadProfileImage userId={currentUser.user?.id}/>)
        });
    }

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation loading={currentUser.loadingUser} user={currentUser.user}/>

                <div className={'settings-contents'}>
                    <div className={'settings-row'}>
                        <div className={'content'}>
                            <Card className="profile-card">
                                <ProfileImage user={currentUser.user} onClick={openModalUploadProfileImage}/>
                                <h1>{currentUser.user?.firstName ?? ''} {currentUser.user?.lastName}</h1>
                            </Card>
                        </div>
                    </div>

                    <div className={'settings-row'}>
                        <div className={'content'}>
                            {currentUser.loadingUser ? <LoadingCard/> :
                                <AccountDetailsCard userId={currentUser.user?.id ?? ''} user={getUserName()}
                                                    onSuccess={onSuccessUpdateDetails}
                                                    onError={() => setToastSettings(errorMessage())}
                                />}
                        </div>
                    </div>

                    <div className={'settings-row'}>
                        <div className={'content'}>
                            {
                                currentUser.loadingUser ? <LoadingCard/>
                                    : <UpdatePasswordCard userId={currentUser.user?.id ?? ''}
                                                          onSuccess={() => setToastSettings(successMessage())}
                                                          onError={() => setToastSettings(errorMessage())}
                                    />
                            }
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