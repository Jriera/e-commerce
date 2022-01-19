import { Product } from "./product";
import { User } from "./user";

export interface Order{
    id?:number;
    cart: Product[];
    totalPrice: number;
    orderDate: Date;
    userId: string | null;
    orderStatus: string;
}