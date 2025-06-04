import React, {useEffect, useState} from "react";
import './stats-grid.css'
import {authenticatedClient} from "../../data/client.ts";
import {KeyValueStats} from "../../data/stats.ts";

interface StatsGridProps {
    institutionId: string;
    onError: (error: Error) => void;
}

export const StatsGrid = ({institutionId, onError}: StatsGridProps): React.JSX.Element => {

    const [stats, setStats] = useState<KeyValueStats[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchKeyValueStats = async () => {
            await authenticatedClient.get(`/api/stats/institution/${institutionId}`)
                .then(response => {
                    setStats(response.data ?? [])
                    setIsLoading(false);
                })
                .catch((error) => onError(error));
        }

        fetchKeyValueStats();
    }, [])

    return (
        <>
            {!isLoading && (
                <div className="stats-grid">
                    {
                        stats.map(kvStat => (
                            <div className={'stats-grid-card'} key={kvStat.key}>
                                <h3>{kvStat.key}</h3>
                                <p>{kvStat.value}</p>
                            </div>
                        ))
                    }
                </div>
            )}

            {isLoading && (
                <div className="stats-grid loading_bg_skeleton"></div>
            )}
        </>
    )
}