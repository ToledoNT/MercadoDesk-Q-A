import { ICreateUser } from "../../interface/user/create-user-interface";
import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interface/responses/response-templete-interface";
import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-user-repositories";

export class CreateUser {
  async execute(user: ICreateUser): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaUserRepository().create(user)
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
