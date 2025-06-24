import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { ResponseTemplateInterface } from "../../../interface/responses/response-templete-interface";
import { CreateLog } from "../../logs/create-log";

export class SearchTicketsByMlIdZohoDesk {
  async execute(
    orgID: string,
    token: string,
    mlId: string
  ): Promise<ResponseTemplateInterface> {
    const response = await new TicketsDeskApi().SearchTicketCf(
      orgID,
      token,
      `customField1=cf_id_ml%3A${mlId}`
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}
