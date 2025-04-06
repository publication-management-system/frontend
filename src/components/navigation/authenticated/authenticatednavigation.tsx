import {User} from "../../../data/user.ts";
import React from "react";
import {Navigation} from "../navigation.tsx";
import {AuthenticatedNavItems} from "./authenticatednavitems.tsx";
import {Dropdown} from "../../dropdown/dropdown.tsx";
import {LoadingProfileImage, ProfileImage} from "../../profile/profileimage.tsx";
import {Link} from "react-router-dom";

export const AuthenticatedNavigation = (props: { user?: User, loading: boolean }): React.JSX.Element => {

    return (
        <Navigation>
            <h1 className={"header-logo"}>PMS</h1>
            <AuthenticatedNavItems/>
            <Dropdown trigger={props.loading ? <LoadingProfileImage /> : <ProfileImage user={props.user} />}>
                <Link to={"/app/settings"}>Settings</Link>
                <Link to={"/app/logout"}>Log out</Link>
            </Dropdown>
        </Navigation>
    );
}