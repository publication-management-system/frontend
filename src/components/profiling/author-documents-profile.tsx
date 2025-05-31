import React, {useEffect, useState} from "react";
import {DataSource, PagedScrapedEntity} from "../../data/scraped-entity.ts";
import {authenticatedClient} from "../../data/client.ts";
import './author-documents-profile.css'
import {DocumentPayload} from "../../data/document-payload.ts";
import {Accordion} from "../accordion/accordion.tsx";
import {Pageable} from "../page/pageable.tsx";


interface AuthorDocumentsProfileProps {
    sessionId: string;
    dataSource: DataSource;
    onError: (error: Error) => void;
}

const DocumentProfileItem = ({doc}: {doc: DocumentPayload}): React.JSX.Element => {
    return (
        <div className="author-document-item">
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Title</span>
                <p className={'author-document-item-info-data'}>{doc.title}</p>
            </div>
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Description</span>
                <p className={'author-document-item-info-data'}>{doc.description ?? '-'}</p>
            </div>
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Authors</span>
                <p className={'author-document-item-info-data'}>{doc.coAuthorsNames.join(', ')}</p>
            </div>
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Issued</span>
                <p className={'author-document-item-info-data'}>{doc.issued}</p>
            </div>
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Publisher</span>
                <p className={'author-document-item-info-data'}>{doc.publisher ?? '-'}</p>
            </div>
            <div className={'author-document-item-info'}>
                <span className={'author-document-item-info-label'}>Links</span>
                <ul>
                    {
                        doc.links.map((item: string, i) => {
                            return (
                                <li key={i}>
                                    <a href={item} key={i}>{item}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export const AuthorDocumentsProfile = (props: AuthorDocumentsProfileProps): React.JSX.Element => {

    const [documents, setDocuments] = useState<PagedScrapedEntity>({
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        loading: true, entities: []
    });

    const fetchScrapedProfile = async (pageNumber: number) => {
        if (!props.sessionId) {
            return;
        }
        await authenticatedClient.get(`/api/scraped-entities/${props.sessionId}?source=${props.dataSource.toUpperCase()}&entityType=DOCUMENT&pageNumber=${pageNumber}&pageSize=10`)
            .then(response => setDocuments({
                loading: false,
                entities: response.data.content,
                pageNumber: response.data.pageable.pageNumber,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
            }))
            .catch((error) => props.onError(error));
    }

    useEffect(() => {
        console.log('zz')
        fetchScrapedProfile(0);
    }, [props.sessionId]);

    const docEntities = documents?.entities
        .map(entity => {
            const dp = JSON.parse(entity.payload) as DocumentPayload
            return {
                component: <DocumentProfileItem doc={dp}/>,
                key: entity.id,
                label: dp.title ?? 'No-Title',
            };
        }) ?? [];

    return (
        documents.loading ? <LoadingAuthorDocumentsProfile/> : (
            <div className={'document-accordion-item'}>
                <Accordion items={docEntities}/>
                <Pageable pageNumber={documents.pageNumber} totalPages={documents.totalPages} onPageChange={(pageNumber) => fetchScrapedProfile(pageNumber)}  />
            </div>
        )
    )
}

export const LoadingAuthorDocumentsProfile = (): React.JSX.Element => {
    return (
        <div className={'loading_bg_skeleton'} style={{width: '100%', height: 400}}>

        </div>
    )
}

