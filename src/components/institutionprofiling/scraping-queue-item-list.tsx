import React, {useEffect, useState} from 'react';
import {ScrapingQueueItem} from "../../data/scraping.ts";
import {getUserInfo} from "../../data/accesstokenutil.ts";
import {authenticatedClient} from "../../data/client.ts";
import {HiOutlineAcademicCap} from "react-icons/hi2";
import {HiOutlineDocumentSearch, HiOutlineExternalLink} from "react-icons/hi";
import './scraping-queue-item-list.css'
import {MoonLoader} from "react-spinners";
import {Button} from "../button/button.tsx";

export default function ScrapingQueueItemList({onRunning}: {onRunning: () => void}): React.JSX.Element {
    const [items, setItems] = useState<ScrapingQueueItem[]>([])
    const [totalCount, setTotalCount] = useState<ScrapingQueueItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const {userId} = getUserInfo();

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            await authenticatedClient.get(`/api/scraping/next-in-queue?userId=${userId}`)
                .then(response => {
                    setItems(response.data?.nextInQueue ?? [])
                    setTotalCount(response.data?.totalInQueue ?? 0);
                    setTimeout(() => setIsLoading(false), 800)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchProjects();

        const interval = setInterval(fetchProjects, 10000);

        return () => clearInterval(interval);
    }, [userId])


    const runScrapingQueue =  async () => {
        await authenticatedClient.post(`/api/scraping`, {})
            .then(() => {
                onRunning()
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            {
                items.length > 0 && (
                    <div className={"scraping-item-list-container"}>
                        {!isLoading && (
                            <>
                                <h3>{`Next in queue - total ${totalCount}`}</h3>
                                <div className={"scraping-item-list-items"}>
                                    {
                                        items.map((item: ScrapingQueueItem) => (
                                            <div className={"scraping-item-list-item"} key={item.id}>
                                                <div className={"scraping-item-list-item-icon"}>
                                                    {item.type.includes("AUTHOR") && <HiOutlineAcademicCap />}
                                                    {item.type.includes("DOCUMENT") && <HiOutlineDocumentSearch />}
                                                    {item.type.includes("CITATION") && <HiOutlineExternalLink />}
                                                </div>

                                                <p className={'scraping-item-list-item-text'}>{item.type.toUpperCase().replace("_", " ")}</p>
                                                {item.scrapingLink && <p className={'scraping-item-list-item-text'}>{item.scrapingLink.slice(0, 30) + "..."}</p>}
                                                {item.payload && <p className={'scraping-item-list-item-text'}>{item.payload.slice(0, 30) + "..."}</p>}
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )}

                        {isLoading && (
                            <>
                                <h3>{`Next in queue - loading...`}</h3>
                                <MoonLoader />
                            </>
                        )}

                        <Button onClick={runScrapingQueue}>Run from queue</Button>
                    </div>
                )
            }
        </>
    )
}