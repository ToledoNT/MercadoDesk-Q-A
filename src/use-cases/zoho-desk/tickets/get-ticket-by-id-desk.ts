import { TicketsDeskApi } from "../../../api/zoho-desk/tickets-api";
import { CreateLog } from "../../logs/create-log";

export class GetTicketByIDZohoDesk {
  async execute(ticketId: string, orgId: string, accessTokenZoho: string) {
    const response = await new TicketsDeskApi().getTicketByID(
      ticketId,
      orgId,
      accessTokenZoho
    );
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}
