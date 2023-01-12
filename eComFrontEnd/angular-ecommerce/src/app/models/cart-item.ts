import { Product } from "./product";

export class CartItem {
    public product: Product;
    public quantity: number;

    constructor(product: Product){
        this.product = product;
        this.quantity = 1;
    }

    get id() {return this.product.id;}
    get name() {return this.product.name;}
    get image() {return this.product.image;}
    get price() {return this.product.price;}
}
