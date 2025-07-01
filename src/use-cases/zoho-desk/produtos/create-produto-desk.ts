
import { ProductDeskApi } from "../../../api/zoho-desk/products-desk-api";
import { IProdutoDesk } from "../../../interfaces/produto-desk-interface";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { CreateLog } from "../../logs/create-log";

export class CreateProdutoZohoDesk {
  async execute(
    orgId: string,
    token: string,
    produtoDesk: IProdutoDesk
  ): Promise<ResponseTemplateInterface> {
    const productDesk = await new ProductDeskApi().create(
      orgId,
      token,
      produtoDesk
    );
    if (!productDesk.status) {
      await new CreateLog().execute(productDesk);
    }
    return productDesk;
  }
}