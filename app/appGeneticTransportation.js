var App = (function () {
    function App() {
    }
    App.prototype.evaluation = function () {
        throw new Error("Method not implemented.");
    };
    App.prototype.crossover = function (parent1, parent2) {
        throw new Error("Method not implemented.");
    };
    App.prototype.mutation = function (individual) {
        throw new Error("Method not implemented.");
    };
    App.prototype.fitness = function () {
        throw new Error("Method not implemented.");
    };
    return App;
}());
var appGeneticTransportation = function () { return ({
    products: [
        new Product('Refrigerator A', 0.751, 999.90),
        new Product('Cell phone', 0.00000899, 2199.12),
        new Product('TV 55', 0.400, 4346.99),
        new Product("TV 50' ", 0.290, 3999.90),
        new Product("TV 42' ", 0.200, 2999.00),
        new Product("Notebook A", 0.00350, 2499.90),
        new Product("Ventilator", 0.496, 199.90),
        new Product("Microwave A", 0.0424, 308.66),
        new Product("Microwave B", 0.0544, 429.90),
        new Product("Microwave C", 0.0319, 299.29),
        new Product("Refrigerator B", 0.635, 849.00),
        new Product("Refrigerator C", 0.870, 1199.89),
        new Product("Notebook B", 0.498, 1999.90),
        new Product("Notebook C", 0.527, 3999.00)
    ],
    tuner: new Tuner(3, 100, 0.05),
    hasErrors: false,
    showForm: true,
    showSimulation: false,
    evaluateInput: function () {
        this.hasErrors = false;
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product.quantity < 0 || product.quantity > 5) {
                this.hasErrors = true;
                product.hasError = true;
            }
            else {
                product.hasError = false;
            }
        }
    },
    simulate: function () {
        this.evaluateInput();
        if (this.hasErrors) {
            return;
        }
        this.showForm = false;
        this.showSimulation = true;
    }
}); };
var Individual = (function () {
    function Individual() {
    }
    return Individual;
}());
var Product = (function () {
    function Product(name, price, space, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.name = name;
        this.price = price;
        this.space = space;
        this.quantity = quantity;
        this.hasError = false;
    }
    return Product;
}());
var Tuner = (function () {
    function Tuner(spaceLimit, numberOfGenerations, mutationRate) {
        this.spaceLimit = spaceLimit;
        this.numberOfGenerations = numberOfGenerations;
        this.mutationRate = mutationRate;
    }
    return Tuner;
}());
//# sourceMappingURL=appGeneticTransportation.js.map