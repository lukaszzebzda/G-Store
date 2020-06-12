export class Transaction {
  TRA_ID: number;
  TRA_PRICE: number;
  TRA_DATETIME: string;
  PRZE_ID: number;
  USR_ID: number;


  constructor(TRA_ID: number, TRA_PRICE: number, TRA_DATETIME: string, PRZE_ID: number, USR_ID: number) {
    this.TRA_ID = TRA_ID;
    this.TRA_PRICE = TRA_PRICE;
    this.TRA_DATETIME = TRA_DATETIME;
    this.PRZE_ID = PRZE_ID;
    this.USR_ID = USR_ID;
  }
}
