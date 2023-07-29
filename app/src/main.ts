const appGeneticTransportation = () => ({
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

    // Validators
    // @ts-ignore
    tunerValidator: new TunerValidator(this.tuner),

    // The following flags control the sections that are being shown in the demostration tab
    showForm: true,
    showSimulation: false,

    // Holds the solutions as individual objects, scores and spaces
    solutions: {},
    solutionScores: {},
    solutionSpaces: {},

    // Holds the best individual found as a solution and its products
    bestSolution: {},
    bestSolutionProducts: {},

    // Holds the selected page's solution and its products
    pageSolution: {},
    pageSolutionProducts: {},

    // Holds the charts being shown in the page
    chartScores: 0,
    chartSpaces: 0,

    // Holds the application that is responsible for the execution of the genetic algorithms
    app: {},

    // @ts-ignore
    paginator: new Paginator(1),

    updateChart() {
        // Destroy pre-existing graphs (required by Chart.js library)
        if (this.chartScores !== 0) {
            this.chartScores.destroy();
        }

        if (this.chartSpaces !== 0) {
            this.chartSpaces.destroy();
        }

        this.chartScores = new LineChart('chartScores', this.solutionScores, 'Score', this.tuner.numberOfGenerations, true);
        this.chartSpaces = new LineChart('chartSpaces', this.solutionSpaces, 'Space used', this.tuner.numberOfGenerations, false, true);
    },

    /**
     * Evaluates the input form fields and updates the status of the products and the tuner parameters
     */
    evaluateInput() {
        const productValidator: ProductValidator = new ProductValidator(this.products);
        this.tunerValidator = new TunerValidator(this.tuner);
        this.hasErrors = (productValidator.validate() && this.tunerValidator.validate()) === false;
    },

    runSimulation(): void {
        this.app = new App(this.tuner, this.products);
        this.app.solve();

        this.solutions = this.app.solutions;
        this.solutionScores = this.app.getSolutionScores();
        this.solutionSpaces = this.app.getSolutionSpaces();
        this.bestSolution = this.app.bestSolution;
        this.bestSolutionProducts = this.app.getSolutionProducts(this.bestSolution);
        this.updateChart();

        // Update paginator
        this.pageSolution = this.app.solutions[0];
        this.pageSolutionProducts = this.app.getSolutionProducts(this.pageSolution);
        this.paginator = new Paginator(this.tuner.numberOfGenerations);
    },

    /**
     * Handles the on-click event when pressing the button to start a new simulation
     */
    onSimulate(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.evaluateInput();
        if (this.hasErrors) {
            return;
        }


        this.runSimulation();
        this.showForm = false;
        this.showSimulation = true;
    },

    /**
     * Handles the on-click event when pressing the button to start a new demostration
     */
    onStartOver(): void {
        this.showForm = true;
        this.showSimulation = false;
    },

    /**
     * Handles the on-click event when pressing the button(s) to execute a new generation
     */
    onNewGeneration(): void {
        document.getElementById('btnNewGeneration').classList.add('is-loading');
        document.getElementById('btnNewGeneration').setAttribute('disabled', 'disabled');

        // Destroy existing graphs
        this.chartScores.destroy();
        this.chartSpaces.destroy();

        // Run a new generation using the app
        this.tuner.numberOfGenerations++;
        this.app.runGeneration();

        // Update the solutions saved
        this.solutions = this.app.solutions;
        this.solutionScores = this.app.getSolutionScores();
        this.solutionSpaces = this.app.getSolutionSpaces();
        this.bestSolution = this.app.bestSolution;
        this.bestSolutionProducts = this.app.getSolutionProducts(this.bestSolution);
        this.updateChart();
        this.paginator.lastPage++;
        setTimeout(() => {
            document.getElementById('btnNewGeneration').classList.remove('is-loading');
            document.getElementById('btnNewGeneration').removeAttribute('disabled');
        }, 1000);
    },

    /**
     * Handles the on-click event when pressing the button to change a page
     */
    onChangePage(page: number): void {
        this.pageSolution = this.app.solutions[page];
        this.pageSolutionProducts = this.app.getSolutionProducts(this.pageSolution);
        this.paginator = new Paginator(this.tuner.numberOfGenerations, page);
    }
});