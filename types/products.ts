export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    featured: boolean;
}
