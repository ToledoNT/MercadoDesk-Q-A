import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-template-model";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";

export class GetTokenApiMercadoLivre {
  async createAccessTokenML(
    clientIdMl: string,
    clientSecretML: string,
    refreshTokenMl: string
  ): Promise<ResponseTemplateInterface> {
    let retry = 1;
    const maxRetries = 5;

    while (retry <= maxRetries) {
      try {
        const response = await axios.post(
          "https://api.mercadolibre.com/oauth/token",
          new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientIdMl,
            client_secret: clientSecretML,
            refresh_token: refreshTokenMl,
          }),
          {
            headers: {
              accept: "application/json",
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );

        return new ResponseTemplateModel(
          true,
          200,
          "Token gerado com sucesso",
          response
        );
      } catch (error: any) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        retry++;

        if (retry === maxRetries) {
          return new ResponseTemplateModel(
            false,
            500,
            "Erro ao gerar token após múltiplas tentativas.",
            error.response?.data || error.message
          );
        }
      }
    }

    return new ResponseTemplateModel(
      false,
      500,
      "Erro no retry de geração de token",
      {}
    );
  }
  async getRefreshToken(
    clientID: string,
    clientSecret: string,
    code: string,
    redirectURL: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const form = {
        grant_type: "authorization_code",
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectURL,
      };

      const response = await axios.post(
        "https://api.mercadolibre.com/oauth/token",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status != 200) {
        throw new Error(
          `Ocorreu um erro ao gerar token: ${response.status} ${response.data}`
        );
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Token gerado com sucesso",
        response.data
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return new ResponseTemplateModel(
          false,
          error.response?.status ?? 500,
          `Ocorreu um erro, tente novamente: ${error.message}`,
          error
        );
      }
      return new ResponseTemplateModel(
        false,
        500,
        "Ocorreu um erro desconhecido, tente novamente",
        error
      );
    }
  }
}
