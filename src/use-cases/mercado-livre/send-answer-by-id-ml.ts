import { CreateLog } from "../logs/create-log";

export class SendAnswerByID {
  async execute(
    tokenMl: string,
    ticketQuestionId: string,
    summary: string
  ): Promise<IResponseMercadoLivre> {
    const response = await new QuestionsAndAnswersMLApi().sendAnswer(
      tokenMl,
      ticketQuestionId,
      summary
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