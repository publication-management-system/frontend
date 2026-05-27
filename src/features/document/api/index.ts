import type { CitationDetailsDto } from "../../../data/citation";
import { client } from "../../../data/client";
import type { DocumentDetailsDto } from "../../../data/documents";

export const getDocumentDetailsById = async (id: string): Promise<DocumentDetailsDto> => {
    const response = await client.get<DocumentDetailsDto>(`/api/public/documents`, {
        params: { documentId: id },
    });

    return response.data;
};

export const getCitationsByDocumentId = async (id: string): Promise<CitationDetailsDto[]> => {
    const response = await client.get<CitationDetailsDto[]>(`/api/public/citations`, {
        params: { documentId: id },
    });

    return response.data;
};
