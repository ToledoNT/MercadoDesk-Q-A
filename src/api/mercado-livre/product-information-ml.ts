import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-template-model";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";

export class ProductInformationMLApi {
  async getProductByID(productID: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${productID}`
      );

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar o produto");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Produto recebido com sucesso!",
        response.data
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return new ResponseTemplateModel(
          false,
          error.response?.status ?? 500,
          error.response?.data.message,
          error.response?.data.error
        );
      }
      return new ResponseTemplateModel(
        false,
        500,
        "Erro interno no servidor",
        error
      );
    }
  }
}
