export type HomestayResponse = {
    id: number;
    name: string;
    address: string;
    price: number;
    images: string;
    slug: string;
    rateStar: number;
    description: string;
    viewCount: number;
    service: string;
};

export type HomestayRequest = {
    name: string;
    address: string;
    price: number;
    images: string;
    description: string;
    service: string;
};