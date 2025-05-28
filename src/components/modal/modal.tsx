import React from "react";
import './modal.css'
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
    children?: React.ReactNode,
    title?: string,
    open: boolean,
    onClose?: () => void,
}

export interface ModalSettings {
    open: boolean,
    bodyComponent: React.ReactNode,
    title?: string,
    onClose?: () => void,
}

export const Modal = (props: ModalProps) : React.JSX.Element => {
    return (
        <div className={`modal ${props.open ? 'modal-open' : 'modal-close'}`}>
            <div className={'modal-content'}>
                <div className={'modal-header'}>
                    <p>{props.title ?? ''}</p>
                    <HiXMark onClick={props.onClose} />
                </div>
                <div className={'modal-body'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}