import { GetTokenApiMercadoLivre } from "../../api/mercado-livre/token-ml-api";
import { IResponseMercadoLivre } from "../../interfaces/responses/response-mercadolivre-interface";
import { ResponseMercadoLivreModel } from "../../model/responses/response-mercadolivre-model";
import { CreateLog } from "../logs/create-log";

export class GetRefreshTokenML {
  async execute(
    clientID: string,
    clientSecret: string,
    code: string,
    redirectURL: string
  ): Promise<IResponseMercadoLivre> {
    const response = await new GetTokenApiMercadoLivre().getRefreshToken(
      clientID,
      clientSecret,
      code,
      redirectURL
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return new ResponseMercadoLivreModel(
      response.status,
      response.code,
      response.message,
      response.data
    );
  }
}
