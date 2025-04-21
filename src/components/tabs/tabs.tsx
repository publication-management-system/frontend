import React, {useState} from "react";
import './tabs.css';

interface TabProps {
    label: string;
    children: React.ReactNode;
    isActive?: boolean;
}

interface TabsProps {
    children: React.ReactNode;
}

export function Tab(props: TabProps) {
    return <div>{props.children}</div>;
}

export function Tabs(props: TabsProps) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabs = React.Children.toArray(props.children)
        .filter((child) => React.isValidElement(child) && child.type === Tab);
    console.log(tabs);
    return (
        <div className="tabs-container">
            <div className="tab-buttons">
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => setActiveTabIndex(index)} className={`${index === activeTabIndex ? 'active' : ''}`}>
                        <span>{tab.props.label ?? 'SSS'}</span>
                    </button>
                ))}
            </div>

            {tabs[activeTabIndex]}
        </div>
    );
}


