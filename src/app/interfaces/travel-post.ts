export interface TravelPost {
    id?: string;
    image?: string | File;

    title: string;
    description: string;
    state: string;
    location: string;
    travelType?: string;
    housing?: string;
    costsTotal?: number;
    costDescription?: string;
    other?: string;
}
