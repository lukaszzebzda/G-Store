export class User {
  public USR_ID: number;
  public USR_NAME: string;
  public USR_EMAIL: string;
  public USR_BIRT: string;
  public USR_TEL: number;
  public USR_PASSWORD: string;
  public USR_PERMISSION: number;


  constructor(
    USR_ID: number, USR_NAME: string, USR_EMAIL: string, USR_BIRT: string, USR_TEL: number, USR_PASSWORD: string, USR_PERMISSION: number)
  {
    this.USR_ID = USR_ID;
    this.USR_NAME = USR_NAME;
    this.USR_EMAIL = USR_EMAIL;
    this.USR_BIRT = USR_BIRT;
    this.USR_TEL = USR_TEL;
    this.USR_PASSWORD = USR_PASSWORD;
    this.USR_PERMISSION = USR_PERMISSION;
  }
}
