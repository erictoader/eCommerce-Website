export class Product {
    constructor(
        public id: number,
        public name: string,
        public desc: string,
        public price: number,
        public available: number,
        public image: ImageBitmap,
        public rating: number,
    ){}
}
