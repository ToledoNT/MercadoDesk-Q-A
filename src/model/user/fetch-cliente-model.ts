import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class FetchClienteModel implements IFetchCliente {
  id: string;
  name: string;
  email: string;
  password: string;
  accessTokenMl: string;
  refreshTokenMl: string;
  sellerIdMl: string;
  refreshTokenZoho: string;
  accessTokenZoho: string;
  departmentIdZohoDesk: string;
  contactIdZohoDesk: string;

  constructor(value: IFetchCliente) {
    this.id = value.id;
    this.name = value.name;
    this.email = value.email;
    this.password = value.password ?? ""; 
    this.accessTokenMl = value.accessTokenMl ?? "";
    this.refreshTokenMl = value.refreshTokenMl ?? "";
    this.sellerIdMl = value.sellerIdMl ?? "";
    this.refreshTokenZoho = value.refreshTokenZoho ?? "";
    this.accessTokenZoho = value.accessTokenZoho ?? "";
    this.departmentIdZohoDesk = value.departmentIdZohoDesk ?? "";
    this.contactIdZohoDesk = value.contactIdZohoDesk
  }
}