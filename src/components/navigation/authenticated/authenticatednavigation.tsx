import {UserData} from "../../../data/user.ts";
import React, {useEffect, useState} from "react";
import {Navigation} from "../navigation.tsx";
import {AuthenticatedNavItems} from "./authenticatednavitems.tsx";
import {Dropdown} from "../../dropdown/dropdown.tsx";
import {LoadingProfileImage, ProfileImage} from "../../profile/profileimage.tsx";
import {Link} from "react-router-dom";
import {authenticatedClient} from "../../../data/client.ts";
import {getUserInfo} from "../../../data/accesstokenutil.ts";

export const AuthenticatedNavigation = (): React.JSX.Element => {
    const [currentUser, setCurrentUser] = useState<UserData>({loadingUser: true, user: undefined});


    const loadCurrentUser = async (): Promise<void> => {
        const resp = await authenticatedClient.get(`/api/users/${getUserInfo().userId}`)
            .then(response => response.data);


        setCurrentUser({loadingUser: false, user: {...resp}});
    }

    useEffect(() => {
        loadCurrentUser();
    }, [])

    return (
        <Navigation>
            <h1 className={"header-logo"}>PMS</h1>
            <AuthenticatedNavItems/>
            <Dropdown trigger={currentUser.loadingUser ? <LoadingProfileImage /> : <ProfileImage user={currentUser.user} />}>
                <Link to={"/app/settings"}>Settings</Link>
                <Link to={"/app/logout"}>Log out</Link>
            </Dropdown>
        </Navigation>
    );
}