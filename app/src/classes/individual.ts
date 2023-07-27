class Individual {
    chromosome: Array<number>;
    score: number;
    spaceUsed: number;
    generation: number;
    capacity: number

    constructor(capacity: number, chromosome: Array<number>|undefined = undefined, generation: number = 0) {
        this.generation = generation;
        this.score = -1;
        this.capacity = capacity;

        // Initialize chromosome
        if (chromosome === undefined) {
            this.chromosome = [];
            for (let i=0; i < capacity; i++) {
                this.chromosome[i] = Math.random() > 0.5 ? 1 : 0;
            }
        } else {
            this.chromosome = chromosome;
        }
    }

    clone(): Individual {
        return new Individual(this.capacity, this.chromosome, this.generation);
    }

    fitness(products: Product[], capacity: number) {
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