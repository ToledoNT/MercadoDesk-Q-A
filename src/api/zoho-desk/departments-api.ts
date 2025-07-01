import axios, { AxiosError } from "axios";
import { ResponseTemplateModel } from "../../model/response-templete-model";
import { ResponseTemplateInterface } from "../../interfaces/responses/response-templete-interface";

export class DepartmentsDeskApi {
  async getAllDepartment(
    orgId: string,
    token: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await axios.get(
        "https://desk.zoho.com/api/v1/departments?isEnabled=true&chatStatus=AVAILABLE",
        {
          headers: {
            orgId: orgId,
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          "Ocorreu um erro ao buscar os departamentos no Zoho Desk"
        );
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Departamentos encontrados com sucesso",
        response.data
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return new ResponseTemplateModel(
          false,
          error.response?.status ?? 500,
          error.response?.data.message,
          error.response?.data.error
        );
      }
      return new ResponseTemplateModel(
        false,
        500,
        "Erro interno no servidor",
        error
      );
    }
  }
}