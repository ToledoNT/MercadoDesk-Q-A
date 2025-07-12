import { ZohoTokenApi } from "../../../api/zoho-token-api";
import { PrismaUserRepository } from "../../../db/prisma/repositories/prisma-user-repositories";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";
import { ResponseTokenZohoModel } from "../../../model/response/response-token-model";

export class CreateTokenApiZoho {
  async execute(): Promise<ResponseTemplateInterface> {
    try {
      const userRepository = new PrismaUserRepository();
      const result = await userRepository.findByPermission("admin");
      if (!result) {
        throw new Error(result);
      }
      const { clientIdZoho, clientSecretZoho, refreshTokenZoho,id } = result.data;
      const generateToken = await new ZohoTokenApi().createTokenDesk(
        clientIdZoho,
        clientSecretZoho,
        refreshTokenZoho,
      );
      if (generateToken?.data?.access_token) {
        const updateAccessToken = await userRepository.update(id, {
          accessTokenZoho: generateToken.data.access_token
        });
      }
      const formattedToken = new ResponseTokenZohoModel(generateToken);
      return new ResponseTemplateModel(true, 200, "Token gerado com sucesso", formattedToken);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao gerar token",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}