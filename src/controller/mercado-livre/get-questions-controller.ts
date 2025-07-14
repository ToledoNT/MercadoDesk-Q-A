import { Request, Response } from "express";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { FetchCliente } from "../../use-cases/user/fetch-user";
import { FieldsValidator } from "../../helpers/fields-validator";
import { SearchTicketsByMlIdZohoDesk } from "../../use-cases/zoho-desk/tickets/search-tickets-by-ml-id";
import { GetQuestionsByID } from "../../use-cases/mercado-livre/get-answer-by-id-ml";
import { GetMlProductByID } from "../../use-cases/mercado-livre/get-product-by-id-ml";
import { CreateTicketZohoDesk } from "../../use-cases/zoho-desk/tickets/create-ticket-desk";
import { SearchProductsByMlIdZohoDesk } from "../../use-cases/mercado-livre/search-products-desk-by-ml-id";
import { ProdutoDeskModel } from "../../model/desk/produto-desk-model";
import { CreateProdutoZohoDesk } from "../../use-cases/zoho-desk/produtos/create-produto-desk";

export class GetUnansweredQuestionsController {
  async handle(req: Request, res: Response) {
    const { orgID } = req.params;
    const { resource } = req.body;
    const questionID = resource.split("/").pop();
    const consultOrganizationByID = await new FetchCliente().execute({
      orgIdDesk: orgID,
    });
    if (!consultOrganizationByID.status) {
      res.status(consultOrganizationByID.code).send(consultOrganizationByID);
      return;
    }
    const requiredFields = [
      "accessTokenZoho",
      "accessTokenMl",
      "contactIdZohoDesk",
      "departmentIdZohoDesk",
    ];
    const validatedFields = new FieldsValidator().execute(
      consultOrganizationByID.data[0],
      requiredFields
    );
    if (!validatedFields.status) {
      res.status(validatedFields.code).send(validatedFields);
      return;
    }
    const ticketExists = await new SearchTicketsByMlIdZohoDesk().execute(
      orgID,
      consultOrganizationByID.data[0].accessTokenZoho,
      questionID
    );
    if (ticketExists.status) {
      res
        .status(400)
        .send(new ResponseTemplateModel(false, 400, "Ticket já criado", []));
      return;
    }
    const getQuestionByID = await new GetQuestionsByID().execute(
      questionID,
      consultOrganizationByID.data[0].accessTokenMl
    );
    if (!getQuestionByID || !getQuestionByID.data) {
      res
        .status(400)
        .send(
          new ResponseTemplateModel(
            false,
            400,
            "QuestionMl não encontrado.",
            []
          )
        );
      return;
    }
    const [{ text, id, item_id: itemIdMl }] = getQuestionByID.data;
    if (!itemIdMl) {
      res
        .status(400)
        .send(
          new ResponseTemplateModel(
            false,
            400,
            "Item não encontrado no Mercado Livre.",
            []
          )
        );
      return;
    }
    const getProductByMlID = await new GetMlProductByID().execute(itemIdMl,consultOrganizationByID.data[0].accessTokenMl);
    if (!getProductByMlID.data) {
      res.status(getProductByMlID.code).send(getProductByMlID);
      return;
    }
    const productDeskSearch = await new SearchProductsByMlIdZohoDesk().execute(
      orgID,
      consultOrganizationByID.data[0].accessTokenZoho,
      itemIdMl
    );
    let productDeskID: string;
    if (productDeskSearch.status && productDeskSearch.data && productDeskSearch.data.length > 0) {
      productDeskID = productDeskSearch.data[0].id;
    } else {
      if (!getProductByMlID.data || !getProductByMlID.data[0]) {
        res.status(400).send(new ResponseTemplateModel(false, 400, "Produto ML não encontrado", []));
        return;
      }
    const createProductDeskModel = new ProdutoDeskModel(
        [consultOrganizationByID.data[0].departmentIdZohoDesk],
        itemIdMl,
        getProductByMlID.data[0].title,
        getProductByMlID.data[0].link
      );
    const createProductDesk = await new CreateProdutoZohoDesk().execute(
        orgID,
        consultOrganizationByID.data[0].accessTokenZoho,
        createProductDeskModel
      );
      if (!createProductDesk.status) {
        res.status(createProductDesk.code).send(createProductDesk);
        return;
      }
    
      productDeskID = createProductDesk?.data?.id;
    }
    if (!productDeskID) {
      res.status(400).send(new ResponseTemplateModel(false, 400, "ID do produto Zoho Desk não encontrado", []));
      return;
    }
    const ticketData = {
      subject: `Pergunta do Mercado Livre - ${id}`, 
      departmentId: consultOrganizationByID.data[0].departmentIdZohoDesk,
      contactId: consultOrganizationByID.data[0].contactIdZohoDesk,
      productId: productDeskID,
      description: text,
      cf: {
        cf_id_ml: questionID,
      },
    };
    const createTicket = await new CreateTicketZohoDesk().execute(
      ticketData,
      orgID,
      consultOrganizationByID.data[0].accessTokenZoho
    );
    if (!createTicket.status) {
      res.status(createTicket.code).send(createTicket);
      return;
    }
    return;
  }
}    