import axios, { AxiosError } from "axios";
import { ScopeListGeneration } from "../helpers/scope-list-genetarion"; 
import { ResponseTemplateModel } from "../model/response-templete-model"; 
import { ResponseTemplateInterface } from "../interfaces/responses/response-templete-interface"; 
const redirectUri: string = process.env.REDIRECT_URL as string;

export class ZohoTokenApi {
  async getNewTokenCrm(
    clientId: string,
    clientSecret: string,
    refreshTokenZoho: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        `https://accounts.zoho.com/oauth/v2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=${new ScopeListGeneration().execute()}`
      );
      if (response.status !== 200) {
        throw new Error("Erro ao gerar token.");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Token gerado com sucesso.",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao gerar token do CRM.",
        error
      );
    }
  }
  async createTokenDesk(
    clientIdZoho: string,
    clientSecretZoho: string,
    refreshTokenZoho: string,
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        "https://accounts.zoho.com/oauth/v2/token",
        null,
        {
          params: {
            refresh_token: refreshTokenZoho,
            client_id: clientIdZoho,
            client_secret: clientSecretZoho,
            grant_type: "refresh_token",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Erro ao renovar token.");
      }

      return new ResponseTemplateModel(
        true,
        200,
        "Access token gerado com sucesso.",
        response.data
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return new ResponseTemplateModel(
          false,
          error.response?.status ?? 500,
          "Erro ao gerar token.",
          error.response?.data
        );
      }

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao gerar token.",
        error instanceof Error ? error.message : String(error)
      )
    }
    };
  async getNewTokenAuthorizationCode(
    code: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        `https://accounts.zoho.com/oauth/v2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`
      );
      if (response.status !== 200) {
        throw new Error("Resposta da API não contém dados");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Token do cliente criado com sucesso",
        response.data
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao gerar token do CRM.",
        error
      );
    }
  }
}
