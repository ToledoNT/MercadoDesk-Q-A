import { ResponseTemplateInterface } from "../interface/responses/response-templete-interface";
import { ResponseTemplateModel } from "../model/response-templete-model";

export class FieldsValidator {
  execute(value: any, fieldsList: Array<string>): ResponseTemplateInterface {
    for (const field of fieldsList) {
      if (!value[field] && value[field] === "") {
        return new ResponseTemplateModel(
          false,
          406,
          `Erro ao utilizar recurso, valor ${field} vazio, verifique.`,
          fieldsList
        );
      }
    }
    return new ResponseTemplateModel(
      true,
      200,
      "Campos validados com sucesso.",
      fieldsList
    );
  }
}
