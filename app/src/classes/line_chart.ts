/**
 * The class serves as a wrapper for the Chart.js instance
 * It helps to create and return a new Chart.js item tailored for this problem
 */
class LineChart {
    constructor(domItemId: string, dataset: number[], label: string, numberOfGenerations: number, startFromZero: boolean = false, useRedColor: boolean = false) {
        const ctx: HTMLElement = document.getElementById(domItemId);

        // @ts-ignore
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLabelsOption(numberOfGenerations),
                datasets: this.getDatasetsOption(label, dataset, useRedColor)
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
                    beginAtZero: startFromZero
                }
            }
            }
        });
    }

    /**
     * Prepares and returns the labels of the Chart.js instance
     * 
     * @param numberOfGenerations 
     */
    private getLabelsOption(numberOfGenerations: number) {
        const labels: number[] = [];
        for (let i =0; i<=numberOfGenerations; i++) {
            labels.push(i);
        }

        return labels;
    }

    /**
     * Prepares and returns the datasets option of the Chart.js instance
     * 
     * @param label 
     * @param dataset 
     * @param useRedColor 
     */
    private getDatasetsOption(label: string, dataset: number[], useRedColor: boolean) {
        const datasetsOptions = [{
            label: label,
            data: dataset,
            borderWidth: 1,
            borderColor: '',
            backgroundColor: ''
        }];

        if (useRedColor === true) {
            datasetsOptions[0].borderColor = 'rgb(255, 99, 132)';
            datasetsOptions[0].backgroundColor = 'rgba(255, 99, 132, 0.5)';
        }

        return datasetsOptions;
    }
}