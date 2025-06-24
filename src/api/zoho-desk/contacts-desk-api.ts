import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-template-model";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";

export class ContactsDeskApi {
  async createContact(
    orgId: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.post(
        "https://desk.zoho.com/api/v1/contacts ",
        {
          zip: "88330-000",
          lastName: "CRM7 - Integração Mercado Livre",
          country: "Brasil",
          secondaryEmail: "contato@crm7.com.br",
          city: "Balneário Camboriú",
          facebook: "CRM7 Zoho Partner",
          description:
            "Parceiro Zoho especializado em integração com Mercado Livre via ZPlugin",
          type: "Zoho Partner",
          title: "CRM7 - Integração Mercado Livre",
          firstName: "Equipe",
          phone: "+55 47 3367-9999",
        },
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Ocorreu um erro ao criar o contato no Zoho Desk");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Contato criado no Zoho Desk com sucesso",
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
  async fetchAllTicketsByContact(
    orgId: string,
    token: string,
    contactId: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        `https://desk.zoho.com/api/v1/contacts/${contactId}/tickets?include=departments`,
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Nenhum ticket encontrado por contato no Zoho Desk!");
      }

      return new ResponseTemplateModel(
        true,
        200,
        "Tickets do contato encontrados com sucesso",
        response.data
      );
    } catch (error: any) {
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
