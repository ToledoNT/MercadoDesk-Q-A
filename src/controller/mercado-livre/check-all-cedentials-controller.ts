import { Request, Response } from "express";
import { FetchCliente } from "../../use-cases/user/fetch-user";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { FieldsValidator } from "../../helpers/fields-validator";

export class CheckAllCredentialsController {
  async handle(req: Request, res: Response) {
    const { orgID } = req.params;
    if (!orgID) {
      res
        .status(400)
        .send(
          new ResponseTemplateModel(false, 400, "orgID não encontrado!", [])
        );
      return;
    }
    const response = await new FetchCliente().execute({ orgIdDesk: orgID });
    const requiredFields: Array<string> = [
      "accessTokenMl",
      "refreshTokenMl",
      "accessTokenZoho",
      "orgIdDesk",
      "clientIdMl",
      "clientIdZoho",
      "clientIdZoho",
      "clientSecretZoho",
      "contactIdZohoDesk",
      "departmentIdZohoDesk",
    ];
    const validatedFields = new FieldsValidator().execute(
      response.data,
      requiredFields
    );
    res.status(validatedFields.code).send(validatedFields);
    return;
  }
}