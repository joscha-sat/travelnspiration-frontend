export interface TravelPost {
    id: string;
    title: string;
    state: string;
    location: string;
    description: string;
    housing?: string;
    costsTotal?: number;
    costDescription?: string;
    other?: string;
}
