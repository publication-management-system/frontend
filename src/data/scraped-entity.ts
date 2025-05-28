export type DataSource = 'google_scholar' | 'dblp' | 'web_of_science' | 'scopus';

export type EntityType = 'author' | 'document' | 'citation' | 'topic';

export interface ScrapedEntity {
    id: string;
    sessionId: string;
    parentId: string | null;
    type: EntityType;
    dataSource: DataSource;
    payload: string;
    scrapedAt: Date | null;
}

export interface PagedScrapedEntity {
    loading: boolean;
    entities: ScrapedEntity[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
}