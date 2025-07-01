import { ProductDeskApi } from "../../api/zoho-desk/products-desk-api";
import { CreateLog } from "../logs/create-log";

export class SearchProductsByMlIdZohoDesk {
  async execute(orgId: string, token: string, idProductMl: string) {
    const query = `customField1=cf_codigo_produto_mercado_livre%3A${idProductMl}`;
    const productDesk = await new ProductDeskApi().search(orgId, token, query);
    if (!productDesk.status) {
      await new CreateLog().execute(productDesk);
    }
    return productDesk;
  }
}