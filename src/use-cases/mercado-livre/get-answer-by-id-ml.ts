import { QuestionsAndAnswersMLApi } from "../../api/mercado-livre/questions-and-answers-ml-api";
import { IResponseMercadoLivre } from "../../interfaces/responses/response-mercadolivre-interface";
import { ResponseMercadoLivreModel } from "../../model/response/response-mercadolivre-model";

export class GetQuestionsByID {
  async execute(id: string, token: string): Promise<IResponseMercadoLivre> {
    const response = await new QuestionsAndAnswersMLApi().getQuestionByIds(
      id,
      token
    );
    return new ResponseMercadoLivreModel(
      response.status,
      response.code,
      response.message,
      response.data
    );
  }
}