import { Product } from "./product";
import { User } from "./user";

export interface Order{
    cart: Product[];
    total: number;
    date: Date;
    userUid: User["uid"] | null;
    status: string;
}