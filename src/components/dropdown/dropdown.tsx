import { useClickAway } from "@uidotdev/usehooks";
import React, { useState } from "react";

import "./dropdown.css";

interface DropdownProps {
    trigger?: React.ReactNode;
    children: React.ReactNode;
}

export const Dropdown = (props: DropdownProps): React.JSX.Element => {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const ref = useClickAway(() => {
        setDropdownOpened(false);
    });

    return (
        <div className="dropdown" ref={ref}>
            <div
                onClick={() => {
                    setDropdownOpened(!dropdownOpened);
                }}
            >
                {props.trigger}
            </div>
            {dropdownOpened && <div className={"dd-elements"}>{props.children}</div>}
        </div>
    );
};
