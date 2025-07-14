import { GetTokenApiMercadoLivre } from "../../../api/mercado-livre/token-ml-api";
import { PrismaUserRepository } from "../../../db/prisma/repositories/prisma-user-repositories";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";
import { ResponseTokenZohoModel } from "../../../model/response/response-token-model";
import { MercadoLivreModel } from "../../../model/mercado-livre/mercadolivre-model";

export class CreateTokenApiMercadoLivre {
  async execute(): Promise<ResponseTemplateInterface> {
      const userRepository = new PrismaUserRepository();
      const result = await userRepository.findByPermission("admin");
      if (!result?.status || !result.data) {
        return new ResponseTemplateModel(false, 404, "Usuário admin não encontrado", null);
      }
      const { clientIdMl, clientSecretMl, refreshTokenMl, id } = result.data;
      const mlModel = new MercadoLivreModel({
        orgId: id,
        clientIdMl,
        clientSecretMl,
        refreshTokenMl
      });
      const generateToken = await new GetTokenApiMercadoLivre().createAccessTokenML(
        mlModel.clientIdMl,
        mlModel.clientSecretMl,
        mlModel.refreshTokenMl
      );
      if (generateToken?.data?.data?.access_token) {
        await userRepository.update(id, {
          accessTokenMl: generateToken.data.data.access_token
        });
      }
      const formattedToken = new ResponseTokenZohoModel(generateToken);
      return new ResponseTemplateModel(true, 200, "Token gerado com sucesso", formattedToken);
  }
}