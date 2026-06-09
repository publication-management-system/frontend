export interface KeyValueStats {
    key: string;
    value: string;
}

export interface AuthorStatistics {
    documentsByYear: DocumentByYear[];
    citationsByYear: CitationsByYear[];
    totalNumberOfCitations: number;
    topics: string[];
}

export interface DocumentByYear {
    year: string;
    documentCount: number;
}

export interface CitationsByYear {
    year: string;
    citationsCount: number;
}

export interface ScrapingStatsDto {
    lastTenMinutes: ScrapingItemByMinute[];
    scrapingCountsByProvider: ScrapingCountsByProvider[];
}

export interface ScrapingItemByMinute {
    minute: string;
    count: number;
}

export interface ScrapingCountsByProvider {
    provider: string;
    count: number;
}
