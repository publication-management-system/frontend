import React, {useEffect, useState} from "react";
import './toast.css'
import {HiXMark} from "react-icons/hi2";


export interface ToastProps {
    message: string,
    onToastClose: () => void,
    open: boolean,
    type: "success" | "info" | "error"
}


export interface ToastSettings {
    open: boolean,
    type: "success" | "info" | "error"
    message: string,
}

export const Toast = (props: ToastProps): React.JSX.Element => {
    const [isVisible, setIsVisible] = useState(props.open);
    const [isExiting, setIsExiting] = useState(false);

    function closeToast() {
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
            props.onToastClose();
        }, 300);
    }

    useEffect(() => {
        if (!props.open) {
            return;
        }

        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsExiting(true);
            closeToast();
        }, 3000);

        return () => clearTimeout(timer);
    }, [props.open]);

    return isVisible ? (<div className={`toast-container toast-${props.type} ${isExiting ? 'toast-exit' : 'toast-open'}`}
                 onClick={closeToast}>
                <div className="toast-controls">
                    <p>{props.message}</p>
                    <HiXMark/>
                </div>
            </div>)
        : <></>
}