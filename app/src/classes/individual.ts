class Individual {
    chromosome: number[];
    score: number;
    spaceUsed: number;
    generation: number;
    capacity: number

    constructor(capacity: number, chromosome: number[]|undefined = undefined, generation: number = 0) {
        this.generation = generation;
        this.score = -1;
        this.capacity = capacity;

        // Initialize chromosome randomly
        if (chromosome === undefined) {
            this.chromosome = [];
            for (let i=0; i < capacity; i++) {
                this.chromosome[i] = Math.random() > 0.5 ? 1 : 0;
            }
        } else {
            this.chromosome = chromosome;
        }
    }

    /**
     * Deeply copies the current object
     * 
     * @returns A clone of the current object as Individual
     */
    clone(): Individual {
        return new Individual(this.capacity, this.chromosome, this.generation);
    }

    /**
     * Based on the fitness function used in the evolutionary algorithms, the method aims to calculate the score and the space used.
     * 
     * @param products
     * @param capacity 
     */
    fitness(products: Product[], capacity: number): void {
        // If already calculated then ignore the below calculations
        if (this.score !== -1) {
            return;
        }

        let scoreEvaluation = 0;
        let space = 0;

        // Calculate the space used and the total price of the items chosen
        for(let i in this.chromosome) {
            if (this.chromosome[i] === 1) {
                scoreEvaluation += products[i].price;
                space += products[i].space;
            }
        }

        if (space > capacity) {
            scoreEvaluation = 0;
        }

        // Update global variables
        this.score = scoreEvaluation;
        this.spaceUsed = space;
    }
}