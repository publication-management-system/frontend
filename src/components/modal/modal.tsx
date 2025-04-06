import React from "react";
import './modal.css'

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
                    <span className={'modal-close-button'} onClick={props.onClose}>X</span>
                </div>
                <div className={'modal-body'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}