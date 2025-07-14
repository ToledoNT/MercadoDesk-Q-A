import { Prisma } from "@prisma/client";
import { ResponseTemplateInterface } from "../../../interfaces/responses/response-templete-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";
import prisma from "../client";

export class PrismaUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.create({ data }); 
      return new ResponseTemplateModel(true, 201, "Usuário criado com sucesso", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao criar usuário",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async findById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findUnique({ where: { id } });
      if (!response) throw new Error("Usuário não encontrado");
      return new ResponseTemplateModel(true, 200, "Usuário encontrado", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        404,
        "Erro ao buscar usuário por ID",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async findByEmail(email: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findUnique({ where: { email } });
      if (!response) throw new Error("Usuário não encontrado");
      return new ResponseTemplateModel(true, 200, "Usuário encontrado", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        404,
        "Erro ao buscar usuário por e-mail",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findMany();
      return new ResponseTemplateModel(true, 200, "Usuários encontrados", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao listar usuários",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.update({ where: { id }, data });
      return new ResponseTemplateModel(true, 200, "Usuário atualizado com sucesso", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao atualizar usuário",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async find(criteria: Prisma.UserWhereInput): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findMany({ where: criteria });
      if (!response || response.length === 0) throw new Error("Nenhum usuário encontrado");
      return new ResponseTemplateModel(true, 200, "Usuários encontrados", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        404,
        "Erro ao buscar usuários",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.delete({ where: { id } });
      return new ResponseTemplateModel(true, 200, "Usuário deletado com sucesso", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao deletar usuário",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async findByPermission(permission: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findFirst({
        where: { permission },
        select: {
          id: true,
          permission: true,
          clientIdZoho: true,
          clientSecretZoho: true,
          refreshTokenZoho: true,
          accessTokenZoho: true,
          refreshTokenMl: true,
          clientIdMl: true,
          clientSecretMl: true
            },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!response) {
        return new ResponseTemplateModel(false, 404, `Nenhum usuário com permissão '${permission}' encontrado`, null);
      }

      return new ResponseTemplateModel(true, 200, "Usuário encontrado", response);
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        404,
        `Erro ao buscar usuário com permissão '${permission}'`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}