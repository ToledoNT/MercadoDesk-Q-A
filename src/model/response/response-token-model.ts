import { ITokenZoho } from "../../interfaces/token-interface";
import { TokenZohoModel } from "../token-zoho-model";

export class ResponseTokenZohoModel {
  status: boolean;
  code: number;
  message: string;
  data: Array<ITokenZoho>;
  constructor(value: any) {
    this.status = value.status;
    this.code = value.code;
    this.message = value.message;
    this.data = this.formatValues(value.data);
  }
  formatValues(value: any): Array<ITokenZoho> {
    const valuesList = Array<ITokenZoho>();
    if (Array.isArray(value) && value.length > 0) {
      for (const data of value) {
        const valueFormated = new TokenZohoModel(data);
        valuesList.push(valueFormated);
      }
    } else {
      const valueFormated = new TokenZohoModel(value);
      valuesList.push(valueFormated);
    }
    return valuesList;
  }
}