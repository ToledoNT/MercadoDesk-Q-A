import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-template-model";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { IProdutoDesk } from "../../interfaces/produto-desk-interface";

export class ProductDeskApi {
  async create(
    orgId: any,
    token: string,
    value: IProdutoDesk
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        `https://desk.zoho.com/api/v1/products`,
        value,
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status != 200) {
        throw new Error("Erro ao cadastrar o produto no Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Produto criado com sucesso",
        response?.data
      );
    } catch (error) {
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
        "Erro ao cadastrar o produto",
        error
      );
    }
  }

  async search(
    orgId: string,
    token: string,
    query: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://desk.zoho.com/api/v1/products/search?limit=1&${query}`,
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status == 204 || response?.data?.data.length === 0) {
        throw new Error("Nenhum produto encontrado");
      }
      if (response?.status != 200) {
        throw new Error("Erro ao pesquisar o produto no Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Produto pesquisado com sucesso",
        response?.data?.data
      );
    } catch (error) {
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
        "Erro ao pesquisar o produto",
        error
      );
    }
  }
}
