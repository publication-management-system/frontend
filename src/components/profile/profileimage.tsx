import {User} from "../../data/user.ts";
import React from "react";
import './profileimage.css'


interface NavigationProfileImageProps {
    user?: User
    onClick?: () => void,
}

export const ProfileImage = (props: NavigationProfileImageProps): React.JSX.Element => {

    return (
        <div className={'profile-image'}
             onClick={props.onClick}>
            {!props.user?.imageUrl ? (
                    <span>{props.user?.firstName?.charAt(0) ?? null}{props.user?.lastName?.charAt(0) ?? null}</span>
                )
                : <img src={props.user?.imageUrl} alt={'ProfileImage'}/>
            }
        </div>
    );
}

export const LoadingProfileImage = () => (
    <div className={'loading_bg_skeleton'}>
    </div>
)