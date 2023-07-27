class Paginator {
    currentPage: number;
    lastPage: number;
    paginatorLength: number;

    constructor(lastPage:number, currentPage: number = 1) {
        this.currentPage = currentPage;
        this.lastPage = lastPage;
        this.paginatorLength = 3;
    }

    hasFirstPage() {
        if (this.currentPage > 2) {
            return true;
        }

        return false;
    }

    hasLastPage() {
        console.log(this.currentPage, this.lastPage);
        if (this.currentPage < (this.lastPage - 1)) {
            return true;
        }

        return false;
    }

    getButtons() {
        const buttons: PaginatorButton[] = [];
        let counter: number;

        if (this.currentPage === 1) {
            counter = 1;
        } else if (this.currentPage === this.lastPage) {
            counter = this.lastPage - this.paginatorLength + 1;
        } else {
            counter = this.currentPage - Math.floor(this.paginatorLength / 2);
        }

        if (counter < 1) {
            counter = 1;
        }

        for (let i=0; i<this.paginatorLength; i++) {
            if (this.currentPage === (counter + i)) {
                buttons.push(new PaginatorButton(counter + i, true));
            } else {
                buttons.push(new PaginatorButton(counter + i));
            }
        }

        return buttons;
    }

    /**
     * Returns the previous page number based on the current page
     * In case the current page is 1, the previous page returned will also be 1
     * 
     * @returns number
     */
    getPreviousPage(): number {
        return this.currentPage === 1 ? 1 : this.currentPage - 1;
    }

    /**
     * Returns the next page number based on the current page
     * In case the current page is equal to the last page, the next page returned will also be the last page
     * 
     * @returns number
     */
    getNextPage(): number {
        return this.currentPage === this.lastPage ? this.lastPage : this.currentPage + 1;
    }
}