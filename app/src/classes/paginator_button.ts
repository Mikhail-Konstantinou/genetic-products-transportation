class PaginatorButton {
    label: string;
    cssClass: string;
    page: number;

    constructor(page:number, isCurrentPage: boolean = false) {
        this.label = 'Goto page ' + page;
        this.page = page;
        this.cssClass = 'pagination-link';

        if (isCurrentPage === true) {
            this.cssClass += ' is-current';
        }
    }
}