import { ICreateUser } from "../../interface/user/create-user-interface";

export class CreateUserModel implements ICreateUser {
  id: string;
  name: string;
  email: string;
  password: string;
  accessTokenMl: string;
  refreshTokenMl: string;
  sellerIdMl: string;
  refreshTokenZoho: string;
  accessTokenZoho: string;

  constructor(value: any) {
    this.id = value?.id ?? ""; 
    this.name = value?.nome ?? "";
    this.email = value?.email ?? "";
    this.password = value?.password ?? "";
    this.accessTokenMl = value?.accessTokenMl ?? "";
    this.refreshTokenMl = value?.refreshTokenMl ?? "";
    this.sellerIdMl = value?.sellerIdMl ?? "";
    this.refreshTokenZoho = value?.refreshTokenZoho ?? "";
    this.accessTokenZoho = value?.accessTokenZoho ?? "";
  }
}
