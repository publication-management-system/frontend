import React, {useEffect} from "react";
import './toast.css'


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
    useEffect(() => {
        if (props.open) {
            setTimeout(() => {
                if (props.open) {
                    props.onToastClose()
                }
            }, 3000)
        }
    }, [props]);

    return (
        <div className={`toast-container toast-${props.type} ${props.open ? 'toast-open' : 'toast-close'}`} onClick={props.onToastClose}>
            <div className={`toast-controls`}>
                <p>{props.message}</p>
                <span onClick={props.onToastClose}>X</span>
            </div>
        </div>
    )
}