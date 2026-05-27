import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import styles from "./drawer.module.css";

interface DrawerProps {
    children?: React.ReactNode;
    isOpened?: boolean;
    onDrawerClose: () => void;
}

export default function Drawer({
    children,
    isOpened,
    onDrawerClose,
}: DrawerProps): React.JSX.Element {
    const [render, setRender] = useState(isOpened);

    const handleClose = () => {
        onDrawerClose();
        setTimeout(() => {
            setRender(false);
        }, 350);
    };

    const ref = useClickAway<HTMLDivElement>(() => {
        handleClose();
    });

    useEffect(() => {
        if (isOpened) {
            setRender(true);
        }
    }, [isOpened]);

    if (!render) {
        return <></>;
    }

    return (
        <div className={clsx(styles.drawerOverlay, isOpened && styles.open)}>
            <div ref={ref} className={styles.drawer}>
                {children}
            </div>
        </div>
    );
}
