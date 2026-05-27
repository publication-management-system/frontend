import { client } from "../../../data/client";
import type { PagedResponse } from "../../../data/paged-response";
import type { AuthorSearchResponse, DocumentsSearchResponse } from "../../../data/search";

export const searchAuthors = async (
    name: string,
    pageNumber = 1,
    pageSize = 5,
): Promise<PagedResponse<AuthorSearchResponse>> => {
    const response = await client.get<PagedResponse<AuthorSearchResponse>>(`/api/search/authors`, {
        params: { name, pageNumber, pageSize },
    });

    return response.data;
};

export const searchDocuments = async (
    name: string,
    pageNumber = 1,
    pageSize = 5,
): Promise<PagedResponse<DocumentsSearchResponse>> => {
    const response = await client.get<PagedResponse<DocumentsSearchResponse>>(`/api/search/documents`, {
        params: { name, pageNumber, pageSize },
    });

    return response.data;
};
