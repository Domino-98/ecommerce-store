export interface CartProduct {
    id: number;
    name: string;
    url: string;
    price: number;
    discountPrice?: number,
    quantity: number;
}