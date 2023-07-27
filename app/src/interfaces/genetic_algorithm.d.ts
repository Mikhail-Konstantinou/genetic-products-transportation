interface GeneticAlgorithm {
    evaluation(): void;
    fitness(): void;
    crossover(parent1: Individual, parent2: Individual): Array<Individual>;
    mutation(individual: Individual): Individual;
}