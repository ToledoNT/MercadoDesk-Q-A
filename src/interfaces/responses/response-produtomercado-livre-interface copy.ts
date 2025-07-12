import { IProdutoMercadoLivre } from "../produto-mercado-livre-interface copy";

export interface IResponseProdutoMercadoLivre {
  status: boolean;
  code: number;
  message: string;
  data: Array<IProdutoMercadoLivre>;
}