import clsx from "clsx";
import React from "react";
import { HiXMark } from "react-icons/hi2";

import styles from "./modal.module.css";

interface ModalProps {
    children?: React.ReactNode;
    title?: string;
    open: boolean;
    onClose?: () => void;
}

export interface ModalSettings {
    open: boolean;
    bodyComponent: React.ReactNode;
    title?: string;
    onClose?: () => void;
}

export const Modal = (props: ModalProps): React.JSX.Element => {
    return (
        <div className={clsx(styles.modal, props.open ? styles.modalOpen : styles.modalClose)}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <p>{props.title ?? ""}</p>
                    <HiXMark onClick={props.onClose} />
                </div>
                <div className={styles.modalBody}>{props.children}</div>
            </div>
        </div>
    );
};
