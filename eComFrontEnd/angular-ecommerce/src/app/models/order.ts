import { OrderItem } from "./order-item";

export class Order {
    constructor(
        public id: number,
        public buyerUsername: String,
        public buyerAddress: string,
        public orderDate: Date,
        public total: number,
        public items: OrderItem[],
    ){}
    
}
