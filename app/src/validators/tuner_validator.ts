class TunerValidator implements Validator {
    tuner: Tuner;
    hasSpaceLimitError: boolean;
    hasNumberOfGenerationsError: boolean;
    hasMutationRateError: boolean;
    hasPopulationSizeError: boolean;

    constructor(tuner: Tuner) {
        this.tuner = tuner;
    }

    /**
     * Validates the space limit to be within a reasonable range and updates the error flag of this object
     * 
     * @returns boolean
     */
    private validateSpaceLimit(): boolean {
        this.hasSpaceLimitError = this.tuner.spaceLimit < 1 || this.tuner.spaceLimit > 10;
        
        return this.hasSpaceLimitError === false;
    }

    /**
     * Validates the number of generation to be within a reasonable range and updates the error flag of this object
     * 
     * @returns boolean
     */
    private validateNumberOfGenerations(): boolean {
        this.hasNumberOfGenerationsError = this.tuner.numberOfGenerations < 1 || this.tuner.numberOfGenerations > 500;
        
        return this.hasNumberOfGenerationsError === false;
    }

    /**
     * Validates the mutation rate to be within a reasonable range and updates the error flag of this object
     * 
     * @returns boolean
     */
    private validateMutationRate(): boolean {
        this.hasMutationRateError = this.tuner.mutationRate <=0 || this.tuner.mutationRate > 1;
        
        return this.hasMutationRateError === false;
    }

    /**
     * Validates the population size to be within a reasonable range and updates the error flag of this object
     * 
     * @returns boolean
     */
    private validatePopulationSize(): boolean {
        this.hasPopulationSizeError = this.tuner.populationSize < 1 || this.tuner.populationSize > 50;
        
        return this.hasPopulationSizeError === false;
    }

    /**
     * Validates all fields used in the tuner object of the validator and updates the validator's error flags
     * 
     * @returns 
     */
    validate(): boolean {
        this.validateSpaceLimit();
        this.validateNumberOfGenerations();
        this.validateMutationRate();
        this.validatePopulationSize();

        return (this.hasSpaceLimitError || this.hasMutationRateError || this.hasNumberOfGenerationsError || this.hasPopulationSizeError) === false;
    }
}