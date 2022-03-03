export class Transaction{
    public id:string;
    public amount:number;
    public wallet:string;
    public fees:number;
    public errors: boolean;


    constructor() {
        this.amount = 0;
        this.fees = 0;
        this.errors = false;
        this.wallet = "";
        this.id = "";
    }
}   