import axios, { AxiosError } from "axios";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { ResponseTemplateModel } from "../../model/response-template-model";

export class GetAccountInformationML {
  async getAccountInformation(
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        "https://api.mercadolibre.com/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar usuário");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Usuário buscado com sucesso!",
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

//1999195168
