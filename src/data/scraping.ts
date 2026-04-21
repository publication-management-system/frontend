export interface ScrapingSession {
    id: string;
    userId: string;
    institutionId: string;
    firstName: string;
    lastName: string;
    status: string;
}

export interface ScrapingStatusResponse {
    status: string;
}

export interface ScrapingQueueItem {
    id: string;
    type: string;
    provider: string;
    payload: string;
    scrapingLink: string;
}