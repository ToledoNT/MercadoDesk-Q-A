import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { ResponseTemplateInterface } from "../../../interfaces/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-template-model";
import { CreateLog } from "../../logs/create-log";

export class CloseTicketZohoDesk {
  async execute(
    orgID: string,
    ticketId: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    const response = await new TicketsDeskApi().CloseTicket(
      orgID,
      token,
      ticketId
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return new ResponseTemplateModel(
      response.status,
      response.code,
      response.message,
      response.data
    );
  }
}
