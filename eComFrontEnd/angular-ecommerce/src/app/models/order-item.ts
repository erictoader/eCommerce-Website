import { Product } from "./product";

export class OrderItem {
    constructor(
        public product: Product,
        public quantity: number,
    ){}
}
