import React from "react";

interface MenuLinkProps {
    icon?: React.ReactElement;
    href: string;
    label: string;
}

import styles from "./menu-link.module.css";

export default function MenuLink({ icon, href, label }: MenuLinkProps): React.ReactElement {
    return (
        <a className={styles.menuLink} href={href}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span>{label}</span>
        </a>
    );
}
