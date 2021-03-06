export default class Pagination {
    pageSize : number;
    pageNumber : number;
    constructor(query : any) {
        this.pageSize = query.pageSize??5;
        this.pageNumber = query.pageNumber??1;
    }
}