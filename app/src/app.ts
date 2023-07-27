/**
 * Contains the Genetic Algorithms implementation
 * 
 * This class represents the solver of the problem which uses a given tuning, products and provides the optimal solutions
 * that the genetic algorithms found.
 */
class App implements GeneticAlgorithm {
    tuner: Tuner;
    products: Product[];
    population: Individual[];
    solutions: Individual[];
    bestSolution: Individual;

    constructor(tuner: Tuner, products: Product[]) {
        this.tuner = tuner;
        this.solutions = [];

        /**
         * A gene represents whether a product should be added to the truck or not.
         * A product might come in different quantities. Therefore, the loop below
         * splits products with high quantity (>1) to take multiple spaces in the array
         */
        let counter: number = 0;
        this.products = [];

        for (let product of products) {
            for (let j=0; j<product.quantity; j++) {
                this.products[counter] = product;
                counter++;
            }
        }
    }

    /**
     * Initializes the population based on the population size stored in the tuner object
     */
    initializePopulation(): void {
        this.population = [];
        for (let i=0; i<this.tuner.populationSize; i++) {
            this.population[i] = new Individual(this.products.length);
        }
    }

    orderPopulation(): void {
        this.population = this.population.sort((a: Individual, b: Individual) => {
            return b.score - a.score;
        });
    }

    evaluation(): void {
        this.fitness();
        this.orderPopulation();
    }

    /**
     * Implements the crossover functionality of the genetic algorithms
     * Based on two given individuals (called parents), the function chooses a random 
     * index to split the two parents. Afterwards, the function creates two new individuals. 
     * One individual that takes the first half of parent 1 and the second half of parent 2
     * and one individual that takes the first half of parent 2 and the second half of parent 1
     * 
     * @param parent1 Individual
     * @param parent2 Individual
     * @returns two new Individual children after the parents' crossover
     */
    crossover(parent1: Individual, parent2: Individual): Individual[] {
        const cutoff: number = Math.floor(Math.random() * this.population.length);
        
        const chromosome1: number[] = [].concat(parent1.chromosome.slice(0, cutoff), parent2.chromosome.slice(cutoff));
        const chromosome2: number[] = [].concat(parent2.chromosome.slice(0, cutoff), parent1.chromosome.slice(cutoff));
        const child1: Individual = new Individual(this.tuner.spaceLimit, chromosome1, parent1.generation + 1);
        const child2: Individual = new Individual(this.tuner.spaceLimit, chromosome2, parent1.generation + 1);

        return [child1, child2];
    }

    /**
     * Mutation function of the genetic algorithms
     * Given the mutation rate, it changes the value of the genes
     * 
     * @param individual Individual
     * @returns 
     */
    mutation(individual: Individual): Individual {
        for (let i in individual.chromosome) {
            if (Math.random() < this.tuner.mutationRate) {
                individual.chromosome[i] = individual.chromosome[i] === 0 ? 1 : 0;
            }
        }

        return individual;
    }

    fitness(): void {
        for (let individual of this.population) {
            individual.fitness(this.products, this.tuner.spaceLimit);
        }
    }

    sumOfEvaluations(): number {
        let sum: number = 0;
        for (let individual of this.population) {
            sum += individual.score;
        }

        return sum;
    }

    selectParent(sumOfEvaluations: number): Individual {
        let sum: number = 0;
        let counter: number = 0;
        const randomValue: number = Math.random() * sumOfEvaluations;

        while (counter < this.population.length -1 && sum < randomValue) {
            sum += this.population[counter].score;
            counter++;
        }

        return this.population[counter];
    }

    updateBestSolution(): void {
        if (this.population[0].score > this.bestSolution.score) {
            this.bestSolution = this.population[0];
        }
    }

    /**
     * The main method of this class. 
     * It executes the full process of genetic algorithms to solve the products transportation problem
     */
    solve(): void {
        this.initializePopulation();
        this.evaluation();
        this.bestSolution = this.population[0];

        for (let generation = 0; generation < this.tuner.numberOfGenerations; generation++) {
            this.runGeneration();
        }
    }

    /**
     * Executes a genetic-algorithm for one generation
     */
    runGeneration() {
        let newPopulation: Individual[] = [];
            
        for (let i=0; i<this.population.length; i+=2) {
            const sumOfEvaluations = this.sumOfEvaluations();

            // Crossover
            const parent1: Individual = this.selectParent(sumOfEvaluations);
            const parent2: Individual = this.selectParent(sumOfEvaluations);
            const children: Individual[] = this.crossover(parent1, parent2);
            
            // Mutation
            newPopulation.push(this.mutation(children[0]));
            newPopulation.push(this.mutation(children[1]));
        }

        // Update population
        this.population = [...newPopulation];
        this.evaluation();
        this.updateBestSolution();
        this.solutions.push(this.population[0]);
    }

    getSolutionScores() {
        const solutionScores: number[] = [];
        for (let solution of this.solutions) {
            solutionScores.push(solution.score);
        }

        return solutionScores;
    }

    getSolutionSpaces() {
        const solutionSpaces: number[] = [];
        for (let solution of this.solutions) {
            solutionSpaces.push(solution.spaceUsed);
        }

        return solutionSpaces;
    }

    getSolutionProducts(solution: Individual) {
        const solutionProducts: Product[] = [];
        for (let index in solution.chromosome) {
            if (solution.chromosome[index] === 1) {
                solutionProducts.push(this.products[index]);
            }
        }

        return solutionProducts;
    }

}