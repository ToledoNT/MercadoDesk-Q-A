import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { CreateLog } from "../../logs/create-log";

export class CommentTicketsZohoDesk {
  async execute(
    orgID: string,
    ticketId: string,
    token: string,
    textComent: string
  ): Promise<ResponseTemplateInterface> {
    const response = await new TicketsDeskApi().CommentTickets(
      orgID,
      token,
      textComent,
      ticketId
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}