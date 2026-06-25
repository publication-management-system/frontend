import clsx from "clsx";
import React, { useState } from "react";
import { HiLogout } from "react-icons/hi";
import {
    HiBars3,
    HiOutlineAcademicCap,
    HiOutlineBolt,
    HiOutlineBriefcase,
    HiOutlineBuildingLibrary,
    HiOutlineHome,
    HiOutlineUserCircle,
} from "react-icons/hi2";

import { getUserInfo } from "../../data/accesstokenutil";
import Drawer from "../drawer/drawer.tsx";

import MenuLink from "./menu-link";

import styles from "./navigation-bar.module.css";

export default function NavigationBar(): React.JSX.Element {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const { userId, institutionId } = getUserInfo();

    return (
        <>
            <Drawer
                isOpened={isDrawerOpened}
                onDrawerClose={() => {
                    setIsDrawerOpened(false);
                }}
            >
                <div className={styles.drawerItems}>
                    <h1 className={clsx("header-extra-small", styles.drawerTitle)}>Publication Management System</h1>
                    <div className={styles.drawerLinks}>
                        <MenuLink href="/" icon={<HiOutlineHome />} label={"Home"} />
                        <MenuLink href="/authors" icon={<HiOutlineAcademicCap />} label={"Authors"} />
                        <MenuLink href="/visualize" icon={<HiOutlineBolt />} label={"Visualize"} />
                        {userId && institutionId && (
                            <MenuLink href="/admin-panel" icon={<HiOutlineUserCircle />} label={"Administrator"} />
                        )}
                        {userId && institutionId && (
                            <MenuLink
                                href="/institution-config"
                                icon={<HiOutlineBuildingLibrary />}
                                label={"Your Institution Configuration"}
                            />
                        )}
                        {userId && institutionId && (
                            <MenuLink href="/projects" icon={<HiOutlineBriefcase />} label={"Your Works"} />
                        )}
                        {userId && institutionId && <MenuLink href="/logout" icon={<HiLogout />} label={"Log out"} />}
                        {!userId && <MenuLink href="/login" icon={<HiOutlineUserCircle />} label={"Administrator"} />}
                    </div>
                </div>
            </Drawer>
            <nav className={styles.topNavContainer}>
                <div className={styles.leftSide}>
                    <div
                        className={clsx(styles.item, styles.menu)}
                        onClick={() => {
                            setIsDrawerOpened(true);
                        }}
                    >
                        <HiBars3 className={styles.menuIcon} />
                    </div>

                    <div className={clsx(styles.navLinks)}>
                        <MenuLink href="/" icon={<HiOutlineHome />} label={"Home"} />
                        <MenuLink href="/authors" icon={<HiOutlineAcademicCap />} label={"Authors"} />
                        <MenuLink href="/visualize" icon={<HiOutlineBolt />} label={"Visualize"} />
                    </div>
                </div>

                <div></div>
            </nav>
        </>
    );
}
