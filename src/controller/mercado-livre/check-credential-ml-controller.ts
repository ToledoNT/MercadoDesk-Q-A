import { Request, Response } from "express";
import { FieldsValidator } from "../../helpers/fields-validator";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { FetchCliente } from "../../use-cases/user/fetch-user";

export class CheckCredentialsMercadoLivreController {
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
    const requiredFields: Array<string> = ["accessTokenMl", "refreshTokenMl"];
    const validatedFields = new FieldsValidator().execute(
      response.data,
      requiredFields
    );

    res.status(validatedFields.code).send(validatedFields);
  }
}
