import { DatabaseLog } from "../../db/prisma/repositories/prisma-logs-repository";
import { ResponseTemplateInterface } from "../../interface/responses/response-templete-interface";
export class CreateLog {
  async execute(value: ResponseTemplateInterface): Promise<void> {
    await new DatabaseLog().create(value);
    return;
  }
}