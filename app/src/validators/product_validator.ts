class ProductValidator implements Validator {
    products: Product[];

    constructor(products: Product[]) {
        this.products = products;
    }

    /**
     * Validates all objects and returns false if at least one object has an invalid quantity
     * Each quantity is considered valid if the value is between 1 and 5
     * 
     * @returns 
     */
    validate(): boolean {
        let hasErrors: boolean = false;

        for (let product of this.products) {            
            if (product.quantity < 0 || product.quantity > 5) {
                hasErrors = true;
                product.hasError = true;
            } else {
                product.hasError = false;
            }
        }

        return hasErrors === false;
    }
}