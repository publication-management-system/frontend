export interface PagedResponse<T> {
    data: T[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
}
