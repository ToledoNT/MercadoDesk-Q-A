import { Request, Response } from "express";
import { FetchCliente } from "../../use-cases/user/fetch-user"; 
import { ResponseTemplateModel } from "../../model/response-templete-model"; 
import { GetTicketByIDZohoDesk } from
import { GetThreadZohoDesk } from "../../use-cases/zoho-desk/tickets/get-thread-desk"; 
import { CommentTicketsZohoDesk } from "../../use-cases/zoho-desk/tickets/comment-tickets"; 
import { SendAnswerByID } from "../../use-cases/mercado-livre/send-answer-by-id-ml"; 
import { CloseTicketZohoDesk } from "../../use-cases/zoho-desk/tickets/close-tickets"; 
import { FieldsValidator } from "../../helpers/fields-validator";

export class SendResponseMlController {
  async handle(req: Request, res: Response) {
    const { orgID, id } = req.params;
    const consultOrganizationByID = await new FetchCliente().execute({
      orgIdDesk: orgID,
    });
    if (!consultOrganizationByID.status) {
      res.status(consultOrganizationByID.code).send(consultOrganizationByID);
      return;
    }

    const requiredFields = ["accessTokenZoho", "accessTokenMl"];
    const validatedFields = new FieldsValidator().execute(
      consultOrganizationByID.data,
      requiredFields
    );
    if (!validatedFields.status) {
      res.status(validatedFields.code).send(validatedFields);
      return;
    }
    const [{ accessTokenZoho, accessTokenMl }] = consultOrganizationByID.data;
    const consultTicket = await new GetTicketByIDZohoDesk().execute(
      id,
      orgID,
      accessTokenZoho!
    );
    if (!consultTicket.status) {
      res
        .status(consultTicket.code)
        .send(
          new ResponseTemplateModel(
            consultTicket.status,
            consultTicket.code,
            consultTicket.message,
            consultTicket.data
          )
        );
      return;
    }
    if (!accessTokenMl) {
      res
        .status(400)
        .send(
          new ResponseTemplateModel(false, 400, "Token não encontrado.", [])
        );
      return;
    }
    const consultThread = await new GetThreadZohoDesk().execute(
      id,
      accessTokenZoho!,
      orgID
    );
    if (!consultThread.status) {
      res.status(consultThread.code).send(consultThread);
      return;
    }
    const ticketQuestionId = consultTicket?.data.cf?.cf_id_ml;
    const responseSummary = consultThread?.data;
    const [firstItem] = responseSummary?.data;
    const summary = firstItem?.summary;
    const sendResponseML = await new SendAnswerByID().execute(
      accessTokenMl,
      ticketQuestionId,
      summary
    );
    if (!sendResponseML.status) {
      res.status(sendResponseML.code).send(sendResponseML);
      return;
    }
    const textComent = "A mensagem foi respondida com sucesso";
    const commentTickets = await new CommentTicketsZohoDesk().execute(
      orgID,
      id,
      accessTokenZoho!,
      textComent
    );
    if (!commentTickets.status) {
      res.status(commentTickets.code).send(commentTickets);
      return;
    }
    const closeTicket = await new CloseTicketZohoDesk().execute(
      orgID,
      id,
      accessTokenZoho!
    );
    res.status(closeTicket.code).send(closeTicket);
    return;
  }
}
