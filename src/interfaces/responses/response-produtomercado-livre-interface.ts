import { IProdutoMercadoLivre } from "../Iproduto-mercado-livre-interfaces";

export interface IResponseProdutoMercadoLivre {
  status: boolean;
  code: number;
  message: string;
  data: Array<IProdutoMercadoLivre>;
}