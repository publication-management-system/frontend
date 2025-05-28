import React, {useState} from "react";
import {HiArrowSmDown} from "react-icons/hi";
import './accordion.css'

export interface AccordionItemData {
    key: string,
    label: string;
    component: React.ReactNode;
}

interface AccordionItemProps {
    key: string,
    label: string;
    component: React.ReactNode;
    isOpen?: boolean;
    onClick?: () => void;
}

export const AccordionItem = ({ key, label, component, isOpen, onClick }: AccordionItemProps): React.JSX.Element => {
    return (
        <div className={`accordion-item`} key={key}>
            <button
                className={`accordion-item-button ${isOpen ? 'accordion-item-active' : ''}`}
                onClick={onClick}
            >
                <p className="accordion-item-label">{label}</p>
                <HiArrowSmDown className={`accordion-arrow ${isOpen ? 'rotate' : ''}`} />
            </button>

            <div className={`accordion-item-content ${isOpen ? 'open' : ''}`}>
                {component}
            </div>
        </div>
    );
};


export const Accordion = ({items}: { items: AccordionItemData[] }): React.JSX.Element => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number | null) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="accordion-container">
            {
                items.map((item, index) => {
                    return (
                        <AccordionItem key={item.key} label={item.label} component={item.component}
                                       onClick={() => handleItemClick(index)}
                                       isOpen={activeIndex === index}
                        />
                    )
                })
            }
        </div>
    )
}