import { IMercadoLivre } from "../mercado-livre-interface";

export interface IResponseMercadoLivre {
  status: boolean;
  code: number;
  message: string;
  data?: Array<IMercadoLivre>;
}
