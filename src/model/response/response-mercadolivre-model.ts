import { IMercadoLivre } from "../../interfaces/mercado-livre-interface";
import { MercadoLivreModel } from "../mercado-livre/mercadolivre-model";

export class ResponseMercadoLivreModel {
  public status: boolean;
  public code: number;
  public message: string;
  public data: Array<IMercadoLivre>;
  constructor(status: boolean, code: number, message: string, data: any) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = this.formatValues(data);
  }
  formatValues(value: any): Array<IMercadoLivre> {
    const valuesList = Array<IMercadoLivre>();
    if (Array.isArray(value) && value.length > 0) {
      for (const data of value) {
        const valueFormated = new MercadoLivreModel(data);
        valuesList.push(valueFormated);
      }
    } else {
      const valueFormated = new MercadoLivreModel(value);
      valuesList.push(valueFormated);
    }
    return valuesList;
  }
}