class Tuner {
    spaceLimit: number;
    numberOfGenerations: number;
    mutationRate: number;
    populationSize: number

    constructor(spaceLimit: number,
        numberOfGenerations: number,
        mutationRate: number, 
        populationSize: number) {
        this.spaceLimit = spaceLimit;
        this.numberOfGenerations = numberOfGenerations;
        this.mutationRate = mutationRate;
        this.populationSize = populationSize
    }
}