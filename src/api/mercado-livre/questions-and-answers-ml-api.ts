import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { ResponseTemplateInterface } from "../../interfaces/responses/response-templete-interface";

export class QuestionsAndAnswersMLApi {
  async getQuestionByIds(
    id: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/questions/${id}?api_version=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar pergunta do ID");
      }
      const { id: questionId, text, item_id } = response.data;
      return new ResponseTemplateModel(
        true,
        200,
        "Pergunta recebida com sucesso!",
        [{ id: questionId, text, item_id }]
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
  async getAllQuestionsSellerML(
    sellerID: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/questions/search?seller_id=${sellerID}&api_version=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar as perguntas");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Perguntas recebidas com sucesso!",
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
  async getAllReceivedQuestionsML(
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/my/received_questions/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar as perguntas");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Perguntas recebidas com sucesso!",
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
  async getAllUnansweredQuestionsML(
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/my/received_questions/search?status=UNANSWERED`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          "Ocorreu um erro ao buscar as perguntas não respondidas"
        );
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Perguntas não respondidas recebidas com sucesso!",
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
  async sendAnswer(
    tokenML: string,
    ticketQuestionId: string,
    summary: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        "https://api.mercadolibre.com/answers",
        {
          question_id: ticketQuestionId,
          text: summary,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenML}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao enviar resposta");
      }

      return new ResponseTemplateModel(
        true,
        200,
        "Resposta enviada com sucesso",
        []
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