import { Request, Response } from "express";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { FetchCliente } from "../../use-cases/user/fetch-user";
import { FieldsValidator } from "../../helpers/fields-validator";

export class CheckCredentialsZohoController {
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
    const requiredFields = ["accessTokenZohoDesk"];
    const validatedFields = new FieldsValidator().execute(
      response.data,
      requiredFields
    );
    res.status(validatedFields.code).send(validatedFields);
    return;
  }
}
