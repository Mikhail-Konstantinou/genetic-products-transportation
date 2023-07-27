var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var App = (function () {
    function App(tuner, products) {
        this.tuner = tuner;
        this.solutions = [];
        var counter = 0;
        this.products = [];
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            for (var j = 0; j < product.quantity; j++) {
                this.products[counter] = product;
                counter++;
            }
        }
    }
    App.prototype.initializePopulation = function () {
        this.population = [];
        for (var i = 0; i < this.tuner.populationSize; i++) {
            this.population[i] = new Individual(this.products.length);
        }
    };
    App.prototype.orderPopulation = function () {
        this.population = this.population.sort(function (a, b) {
            return b.score - a.score;
        });
    };
    App.prototype.evaluation = function () {
        this.fitness();
        this.orderPopulation();
    };
    App.prototype.crossover = function (parent1, parent2) {
        var cutoff = Math.floor(Math.random() * this.population.length);
        var chromosome1 = [].concat(parent1.chromosome.slice(0, cutoff), parent2.chromosome.slice(cutoff));
        var chromosome2 = [].concat(parent2.chromosome.slice(0, cutoff), parent1.chromosome.slice(cutoff));
        var child1 = new Individual(this.tuner.spaceLimit, chromosome1, parent1.generation + 1);
        var child2 = new Individual(this.tuner.spaceLimit, chromosome2, parent1.generation + 1);
        return [child1, child2];
    };
    App.prototype.mutation = function (individual) {
        for (var i in individual.chromosome) {
            if (Math.random() < this.tuner.mutationRate) {
                individual.chromosome[i] = individual.chromosome[i] === 0 ? 1 : 0;
            }
        }
        return individual;
    };
    App.prototype.fitness = function () {
        for (var _i = 0, _a = this.population; _i < _a.length; _i++) {
            var individual = _a[_i];
            individual.fitness(this.products, this.tuner.spaceLimit);
        }
    };
    App.prototype.sumOfEvaluations = function () {
        var sum = 0;
        for (var _i = 0, _a = this.population; _i < _a.length; _i++) {
            var individual = _a[_i];
            sum += individual.score;
        }
        return sum;
    };
    App.prototype.selectParent = function (sumOfEvaluations) {
        var sum = 0;
        var counter = 0;
        var randomValue = Math.random() * sumOfEvaluations;
        while (counter < this.population.length - 1 && sum < randomValue) {
            sum += this.population[counter].score;
            counter++;
        }
        return this.population[counter];
    };
    App.prototype.updateBestSolution = function () {
        if (this.population[0].score > this.bestSolution.score) {
            this.bestSolution = this.population[0];
        }
    };
    App.prototype.solve = function () {
        this.initializePopulation();
        this.evaluation();
        this.bestSolution = this.population[0];
        for (var generation = 0; generation < this.tuner.numberOfGenerations; generation++) {
            this.runGeneration();
        }
    };
    App.prototype.runGeneration = function () {
        var newPopulation = [];
        for (var i = 0; i < this.population.length; i += 2) {
            var sumOfEvaluations = this.sumOfEvaluations();
            var parent1 = this.selectParent(sumOfEvaluations);
            var parent2 = this.selectParent(sumOfEvaluations);
            var children = this.crossover(parent1, parent2);
            newPopulation.push(this.mutation(children[0]));
            newPopulation.push(this.mutation(children[1]));
        }
        this.population = __spreadArray([], newPopulation, true);
        this.evaluation();
        this.updateBestSolution();
        this.solutions.push(this.population[0]);
    };
    App.prototype.getSolutionScores = function () {
        var solutionScores = [];
        for (var _i = 0, _a = this.solutions; _i < _a.length; _i++) {
            var solution = _a[_i];
            solutionScores.push(solution.score);
        }
        return solutionScores;
    };
    App.prototype.getSolutionSpaces = function () {
        var solutionSpaces = [];
        for (var _i = 0, _a = this.solutions; _i < _a.length; _i++) {
            var solution = _a[_i];
            solutionSpaces.push(solution.spaceUsed);
        }
        return solutionSpaces;
    };
    App.prototype.getSolutionProducts = function () {
        var solutionProducts = [];
        for (var index in this.bestSolution.chromosome) {
            if (this.bestSolution.chromosome[index] === 1) {
                solutionProducts.push(this.products[index]);
            }
        }
        return solutionProducts;
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
    tuner: new Tuner(3, 100, 0.05, 20),
    hasErrors: false,
    showForm: true,
    showSimulation: false,
    solutions: {},
    solutionScores: {},
    solutionSpaces: {},
    bestSolution: {},
    bestSolutionProducts: {},
    chartScores: 0,
    chartSpaces: 0,
    app: {},
    updateChart: function () {
        var labels = [];
        for (var i = 0; i < this.tuner.numberOfGenerations; i++) {
            labels.push(i + 1);
        }
        var ctxScores = document.getElementById('chartScores');
        var ctxSpaces = document.getElementById('chartSpaces');
        var ctxTuning = document.getElementById('chartTuning');
        if (this.chartScores !== 0) {
            this.chartScores.destroy();
        }
        if (this.chartSpaces !== 0) {
            this.chartSpaces.destroy();
        }
        this.chartScores = new Chart(ctxScores, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Score',
                        data: this.solutionScores,
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Generations'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        this.chartSpaces = new Chart(ctxSpaces, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Space used',
                        data: this.solutionSpaces,
                        borderWidth: 1,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Generations'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    },
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.evaluateInput();
        if (this.hasErrors) {
            return;
        }
        this.showForm = false;
        this.showSimulation = true;
        this.runSimulation();
    },
    runSimulation: function () {
        this.app = new App(this.tuner, this.products);
        this.app.solve();
        this.solutions = this.app.solutions;
        this.solutionScores = this.app.getSolutionScores();
        this.solutionSpaces = this.app.getSolutionSpaces();
        this.bestSolution = this.app.bestSolution;
        this.bestSolutionProducts = this.app.getSolutionProducts();
        this.updateChart();
    },
    onStartOver: function () {
        this.showForm = true;
        this.showSimulation = false;
    },
    onNewGeneration: function () {
        document.getElementById('btnNewGeneration').classList.add('is-loading');
        this.chartScores.destroy();
        this.chartSpaces.destroy();
        this.tuner.numberOfGenerations++;
        this.app.runGeneration();
        this.solutions = this.app.solutions;
        this.solutionScores = this.app.getSolutionScores();
        this.solutionSpaces = this.app.getSolutionSpaces();
        this.bestSolution = this.app.bestSolution;
        this.bestSolutionProducts = this.app.getSolutionProducts();
        this.updateChart();
        setTimeout(function () {
            document.getElementById('btnNewGeneration').classList.remove('is-loading');
        }, 500);
    }
}); };
var Individual = (function () {
    function Individual(capacity, chromosome, generation) {
        if (chromosome === void 0) { chromosome = undefined; }
        if (generation === void 0) { generation = 0; }
        this.generation = generation;
        this.score = -1;
        this.capacity = capacity;
        if (chromosome === undefined) {
            this.chromosome = [];
            for (var i = 0; i < capacity; i++) {
                this.chromosome[i] = Math.random() > 0.5 ? 1 : 0;
            }
        }
        else {
            this.chromosome = chromosome;
        }
    }
    Individual.prototype.clone = function () {
        return new Individual(this.capacity, this.chromosome, this.generation);
    };
    Individual.prototype.fitness = function (products, capacity) {
        if (this.score !== -1) {
            return;
        }
        var scoreEvaluation = 0;
        var space = 0;
        for (var i in this.chromosome) {
            if (this.chromosome[i] === 1) {
                scoreEvaluation += products[i].price;
                space += products[i].space;
            }
        }
        if (space > capacity) {
            scoreEvaluation = 0;
        }
        this.score = scoreEvaluation;
        this.spaceUsed = space;
    };
    return Individual;
}());
var Product = (function () {
    function Product(name, space, price, quantity) {
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
    function Tuner(spaceLimit, numberOfGenerations, mutationRate, populationSize) {
        this.spaceLimit = spaceLimit;
        this.numberOfGenerations = numberOfGenerations;
        this.mutationRate = mutationRate;
        this.populationSize = populationSize;
    }
    return Tuner;
}());
//# sourceMappingURL=main.js.map