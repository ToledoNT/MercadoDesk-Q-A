import { ICreateUser } from "../../interfaces/user/create-user-interface";

export class CreateUserModel implements ICreateUser {
  permission: string;
  name: string;
  email: string;
  password: string;
  accessTokenMl: string;
  refreshTokenMl: string;
  sellerIdMl: string;
  orgIdDesk: string;
  clientIdZoho: string;
  clientSecretZoho: string;
  refreshTokenZoho: string;
  accessTokenZoho: string;
  departmentIdZohoDesk: string;
  contactIdZohoDesk: string;

  constructor(value: any) {
    this.permission = value?.permission ?? "";
    this.name = value?.name ?? ""; 
    this.email = value?.email ?? "";
    this.password = value?.password ?? "";
    this.accessTokenMl = value?.accessTokenMl ?? "";
    this.refreshTokenMl = value?.refreshTokenMl ?? "";
    this.sellerIdMl = value?.sellerIdMl ?? "";
    this.orgIdDesk = value?.orgIdDesk ?? "";
    this.clientIdZoho = value?.clientIdZoho ?? "";
    this.clientSecretZoho = value?.clientSecretZoho ?? "";
    this.refreshTokenZoho = value?.refreshTokenZoho ?? "";
    this.accessTokenZoho = value?.accessTokenZoho ?? "";
    this.departmentIdZohoDesk = value?.departmentIdZohoDesk ?? "";
    this.contactIdZohoDesk = value?.contactIdZohoDesk ?? "";
  }
}