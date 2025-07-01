import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { CreateLog } from "../../logs/create-log";

export class CreateTicketZohoDesk {
  async execute(data: any, orgId: string, tokenZoho: string) {
    const response = await new TicketsDeskApi().createTicket(
      data,
      orgId,
      tokenZoho
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}