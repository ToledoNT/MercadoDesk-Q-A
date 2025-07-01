import { ProductInformationMLApi } from "../../api/mercado-livre/product-information-ml";
import { IResponseProdutoMercadoLivre } from "../../interfaces/responses/response-produtomercado-livre-interface copy";
import { ResponseProdutoMercadoLivreModel } from "../../model/responses/response-produto-mercado-livre";
import { CreateLog } from "../logs/create-log";

export class GetMlProductByID {
  async execute(id: string): Promise<IResponseProdutoMercadoLivre> {
    const response = await new ProductInformationMLApi().getProductByID(id);
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return new ResponseProdutoMercadoLivreModel(response);
  }
}