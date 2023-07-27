class Product {
    name: string;
    price: number;
    space: number;
    quantity: number;
    hasError: boolean;

    constructor(name: string, space: number, price: number, quantity:number = 1) {
        this.name = name;
        this.price = price;
        this.space = space;
        this.quantity = quantity;
        this.hasError = false;
    }
}