import type { AuthorDetailsDto } from "../../../data/authors";
import { client } from "../../../data/client";
import type { DocumentDetailsDto } from "../../../data/documents";
import type { PagedResponse } from "../../../data/paged-response";
import type { AuthorSearchResponse } from "../../../data/search";
import type { AuthorStatistics } from "../../../data/stats";

export const getAuthorDetailsById = async (id: string): Promise<AuthorDetailsDto> => {
    const response = await client.get<AuthorDetailsDto>(`/api/public/authors`, {
        params: { authorId: id },
    });

    return response.data;
};

export const getAuthorDocuments = async (
    authorId: string,
    pageNumber = 1,
    pageSize = 10,
): Promise<PagedResponse<DocumentDetailsDto>> => {
    const response = await client.get<PagedResponse<DocumentDetailsDto>>(`/api/public/authors/documents`, {
        params: { authorId, pageNumber, pageSize },
    });

    return response.data;
};

export const getAuthorStatistics = async (authorId: string): Promise<AuthorStatistics> => {
    const response = await client.get<AuthorStatistics>(`/api/public/stats/authors`, {
        params: { authorId },
    });

    return response.data;
};

export const getAuthorsPaged = async (pageNumber = 1, pageSize = 10): Promise<PagedResponse<AuthorSearchResponse>> => {
    const response = await client.get<PagedResponse<AuthorSearchResponse>>(`/api/public/authors/minimal`, {
        params: { pageNumber, pageSize },
    });

    return response.data;
};
