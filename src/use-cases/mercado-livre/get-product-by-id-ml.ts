import { ProductInformationMLApi } from "../../api/mercado-livre/product-information-ml";
import { IResponseProdutoMercadoLivre } from "../../interfaces/responses/response-produtomercado-livre-interface";
import { ResponseProdutoMercadoLivreModel } from "../../model/response/response-produto-mercado-livre";
import { CreateLog } from "../logs/create-log";

export class GetMlProductByID {
  async execute(id: string, accessTokenMl: string): Promise<IResponseProdutoMercadoLivre> {
    const response = await new ProductInformationMLApi().getProductByID(id,accessTokenMl);
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return new ResponseProdutoMercadoLivreModel(response);
  }
}