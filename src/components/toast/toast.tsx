import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";

import styles from "./toast.module.css";

export interface ToastProps {
    message: string;
    onToastClose: () => void;
    open: boolean;
    type: "success" | "info" | "error";
}

export interface ToastSettings {
    open: boolean;
    type: "success" | "info" | "error";
    message: string;
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
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [props.open]);

    return isVisible ? (
        <div
            className={clsx(
                styles.toastContainer,
                styles[`toast-${props.type}`],
                styles[`toast-${isExiting ? "exit" : "open"}`],
            )}
            onClick={closeToast}
        >
            <div className={styles.toastControls}>
                <p>{props.message}</p>
                <HiXMark />
            </div>
        </div>
    ) : (
        <></>
    );
};
