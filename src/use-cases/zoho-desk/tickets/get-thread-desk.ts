import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { CreateLog } from "../../logs/create-log";

export class GetThreadZohoDesk {
  async execute(
    ticketId: string,
    token: string,
    orgID: string
  ): Promise<ResponseTemplateInterface> {
    const response = await new TicketsDeskApi().ConsultThreadByID(
      ticketId,
      token,
      orgID
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}