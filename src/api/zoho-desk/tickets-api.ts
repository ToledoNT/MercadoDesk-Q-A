import axios, { AxiosError } from "axios";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { ResponseTemplateModel } from "../../model/response-template-model";

export class TicketsDeskApi {
  async createTicket(
    ticketData: any,
    orgId: string,
    tokenZoho: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        "https://desk.zoho.com/api/v1/tickets",
        ticketData,
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${tokenZoho}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao criar o ticketno Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Ticket criado com sucesso",
        response.data
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
        "Erro interno no servidor",
        error
      );
    }
  }

  async getTicketByID(
    ticketId: string,
    orgId: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://desk.zoho.com/api/v1/tickets/${ticketId}`,
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar ticket por ID no Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Ticket encontrado com sucesso",
        response.data
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
        "Erro interno no servidor",
        error
      );
    }
  }

  async ConsultThreadByID(
    ticketId: string,
    token: string,
    orgID: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://desk.zoho.com/api/v1/tickets/${ticketId}/threads`,
        {
          headers: {
            orgId: orgID,
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao buscar o ticket no Zogo Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Ticket encontrado com sucesso",
        response.data
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
        "Erro interno no servidor",
        error
      );
    }
  }

  async CommentTickets(
    orgId: string,
    token: string,
    textComent: string,
    ticketId: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        `https://desk.zoho.com/api/v1/tickets/${ticketId}/comments`,
        {
          isPublic: false,
          content: textComent,
        },
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          "Ocorreu um erro ao adicionar o comentário no ticket do Zoho Desk"
        );
      }
      return new ResponseTemplateModel(
        true,
        response.status,
        "Comentário adicionado com sucesso",
        response.data
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return new ResponseTemplateModel(
          false,
          error.response?.status ?? 500,
          error.response?.data?.message ?? "Erro desconhecido",
          error.response?.data?.error ?? null
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

  async CloseTicket(
    orgID: string,
    token: string,
    ticketId: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        "https://desk.zoho.com/api/v1/closeTickets",
        {
          ids: [ticketId],
        },
        {
          headers: {
            orgId: orgID,
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Ocorreu um erro ao fechar o ticket no Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Ticket fechado com sucesso",
        response.data
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
        "Erro interno no servidor",
        error
      );
    }
  }
  async SearchTicketCf(
    orgID: string,
    token: string,
    query: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://desk.zoho.com/api/v1/tickets/search?limit=1&${query}`,
        {
          headers: {
            orgId: orgID,
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status == 204) {
        throw new Error("Nenhum ticket encontrado");
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          "Ocorreu um erro ao pesquisar o ticket por Custom Field no Zoho Desk"
        );
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Ticket pesquisado com sucesso",
        response.data
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
      return new ResponseTemplateModel(false, 500, error as string, error);
    }
  }
}
