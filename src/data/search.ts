import type { PagedResponse } from "./paged-response";

export interface AuthorSearchResponse {
    id: string;
    name: string;
    institution?: string;
    imageUrl?: string;
}

export interface DocumentsSearchResponse {
    id: string;
    title: string;
    publisher: string;
    volume: string;
}

export interface SearchResults {
    authors: PagedResponse<AuthorSearchResponse>;
    documents: PagedResponse<DocumentsSearchResponse>;
    term: string;
}
