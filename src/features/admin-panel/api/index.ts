import { authenticatedClient, client } from "../../../data/client";
import type {
    EnqueueScrapingRequestDto,
    ScrapingFailedItemDto,
    ScrapingStatusResponseDto,
} from "../../../data/scraping";
import type { ScrapingStatsDto } from "../../../data/stats";

export const getScrapingStats = async (accessToken: string) => {
    const resp = await client.get<ScrapingStatsDto>("/api/scraping/stats", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return resp.data;
};

export const enqueueAuthorForScraping = async (req: EnqueueScrapingRequestDto) => {
    const response = await authenticatedClient.post<ScrapingStatusResponseDto>("/api/scraping/enqueue", { ...req });

    return response.data;
};

export const downloadGraphData = async (): Promise<void> => {
    const response = await client.get("/api/public/visualize/download", {
        responseType: "blob",
    });

    const disposition = response.headers["content-disposition"];
    const fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? "graph.gexf";
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};

export const getFailedItems = async () => {
    const resp = await authenticatedClient.get<ScrapingFailedItemDto[]>("/api/scraping/failed-items");
    return resp.data;
};

export const retryFailedQueue = async () => {
    const resp = await authenticatedClient.post<ScrapingFailedItemDto[]>("/api/scraping/retry-failed-items", {});
    return resp.data;
};
