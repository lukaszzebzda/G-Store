export class RatingsReceived {
  OCE_ID: number;
  USR_NAME: string;
  OCE_RATE: number;
  OCE_MESSAGE: string;
  USR_ID: number;
  PRZE_ID: number;
  OCE_DATE: string;


  constructor(OCE_ID: number, USR_NAME: string, OCE_RATE: number, OCE_MESSAGE: string, USR_ID: number, PRZE_ID: number, OCE_DATE: string) {
    this.OCE_ID = OCE_ID;
    this.USR_NAME = USR_NAME;
    this.OCE_RATE = OCE_RATE;
    this.OCE_MESSAGE = OCE_MESSAGE;
    this.USR_ID = USR_ID;
    this.PRZE_ID = PRZE_ID;
    this.OCE_DATE = OCE_DATE;
  }
}
