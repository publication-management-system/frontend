import { useEffect, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";

import { Button } from "../../components/button/button";
import type { ScrapingFailedItemDto } from "../../data/scraping";

import { getFailedItems, retryFailedQueue } from "./api";

import styles from "./failed-items-list.module.css";

export const FailedItemsList = (): React.JSX.Element => {
    const [failedItems, setFailedItems] = useState<ScrapingFailedItemDto[]>([]);
    const [err, setErr] = useState<string | undefined>("");

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        let cancelled = false;

        const load = async () => {
            try {
                const data = await getFailedItems();

                if (!cancelled) {
                    setFailedItems(data);
                }
            } catch (e) {
                console.error("Failed to load scraping failedItems", e);
            }

            if (!cancelled) {
                timeoutId = setTimeout(load, 30000);
            }
        };

        load();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, []);

    const retriggerFailedItems = () => {
        setErr(undefined);
        retryFailedQueue()
            .then(() => {
                setFailedItems([]);
            })
            .catch(() => {
                setErr("Could not retry failed items.");
            });
    };

    return (
        <div className={styles.failedItems}>
            <h1 className={"header-extra-small"}>Found Failed Items</h1>
            {err && <p>{err}</p>}
            {failedItems.length > 0 &&
                failedItems.map((item) => (
                    <div key={item.id} className={styles.failedItemContainer}>
                        <HiOutlineExclamation />
                        <p className={"body-small-text"}>
                            <b>Type:</b> {item.type} <b>Source:</b> {item.dataSource}
                        </p>
                        <p className={"body-small-text"}>{item.details}</p>
                    </div>
                ))}
            <Button
                onClick={() => {
                    retriggerFailedItems();
                }}
            >
                Retry failed items
            </Button>
        </div>
    );
};
