import React, {useEffect, useState} from "react";
import {DataSource, PagedScrapedEntity} from "../../data/scraped-entity.ts";
import {authenticatedClient} from "../../data/client.ts";
import './author-scraped-profile.css'

interface AuthorScrapedProfileProps {
    sessionId: string;
    dataSource: DataSource;
    onError: (error: Error) => void;
}

export const AuthorScrapedProfile = (props: AuthorScrapedProfileProps): React.JSX.Element => {

    const [authorProfile, setAuthorProfile] = useState<PagedScrapedEntity>({
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        loading: true, entities: []});

    useEffect(() => {
        const fetchScrapedProfile = async () => {
            if (!props.sessionId) {
                return;
            }
            await authenticatedClient.get(`/api/scraped-entities/${props.sessionId}?source=${props.dataSource.toUpperCase()}&entityType=AUTHOR&pageNumber=0&pageSize=1`)
                .then(response => setAuthorProfile({
                    pageNumber: response?.data?.pageable?.pageNumber ?? 0,
                    totalElements: response?.data?.totalElements ?? 0,
                    totalPages: response?.data?.totalPages ?? 0,
                    loading: false,
                    entities: response.data.content
                }))
                .catch((error) => props.onError(error));
        }

        fetchScrapedProfile();
    }, [props.sessionId]);

    const authorProfilePayload = JSON.parse(authorProfile.entities.length > 0 ? (authorProfile.entities[0]).payload : '{}');
    return (
        authorProfile.loading ? <LoadingAuthorScrapedProfile /> : (
            <div className="author-scraped-profile">
                <img src={authorProfilePayload?.imageUrl ?? ''} alt={'Profile image'} />
                <div>
                    <h2>{authorProfilePayload.authorName}</h2>
                    <p>{authorProfilePayload.institution}</p>
                    <p>{authorProfilePayload.institutionRole}</p>
                </div>
            </div>
        )
    )
}

export const LoadingAuthorScrapedProfile = (): React.JSX.Element => {
    return (
        <div className={'loading_bg_skeleton'} style={{width:'100%', height: 400}}>

        </div>
    )
}

