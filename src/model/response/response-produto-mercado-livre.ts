import { IProdutoMercadoLivre } from "../../interfaces/Iproduto-mercado-livre-interfaces";
import { ProdutoMercadoLivreModel } from "../mercado-livre/produto-mercado-livre-model";

export class ResponseProdutoMercadoLivreModel {
  public status: boolean;
  public code: number;
  public message: string;
  public data: Array<ProdutoMercadoLivreModel>;
  constructor(value: any) {
    this.status = value.status;
    this.code = value.code;
    this.message = value.message;
    this.data = this.formatValue(value.data);
  }

  formatValue(value: any): Array<IProdutoMercadoLivre> {
    const produtoList = Array<IProdutoMercadoLivre>();
    if (Array.isArray(this.data) && this.data.length > 0) {
      for (const data of this.data) {
        const produtoFormated = new ProdutoMercadoLivreModel(data);
        produtoList.push(produtoFormated);
      }
    } else {
      const produtoFormated = new ProdutoMercadoLivreModel(value);
      produtoList.push(produtoFormated);
    }
    return produtoList;
  }
}