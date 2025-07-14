import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class UpdateClienteModel {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  accessTokenMl?: string;
  refreshTokenMl?: string;
  sellerIdMl?: string;
  clientIdMl!: string;
  clientSecretMl!: string;
  orgIdDesk?: string;
  refreshTokenZoho?: string;
  accessTokenZoho?: string;
  departmentIdZohoDesk?: string;
  contactIdZohoDesk?: string;

  constructor(newValue: any, oldValue: IFetchCliente) {
    this.formatFields(newValue, oldValue);
  }

  private formatFields(newValue: any, oldValue: IFetchCliente) {
    this.id = (newValue?.id !== undefined && newValue.id !== oldValue.id) ? newValue.id : oldValue.id;

    this.name = (newValue?.name !== undefined && newValue.name !== oldValue.name) ? newValue.name : oldValue.name;

    this.email = (newValue?.email !== undefined && newValue.email !== oldValue.email) ? newValue.email : oldValue.email;

    this.password = (newValue?.password !== undefined && newValue.password !== oldValue.password) ? newValue.password : oldValue.password;

    this.accessTokenMl = (newValue?.accessTokenMl !== undefined && newValue.accessTokenMl !== oldValue.accessTokenMl) ? newValue.accessTokenMl : oldValue.accessTokenMl;

    this.refreshTokenMl = (newValue?.refreshTokenMl !== undefined && newValue.refreshTokenMl !== oldValue.refreshTokenMl) ? newValue.refreshTokenMl : oldValue.refreshTokenMl;

    this.sellerIdMl = (newValue?.sellerIdMl !== undefined && newValue.sellerIdMl !== oldValue.sellerIdMl) ? newValue.sellerIdMl : oldValue.sellerIdMl;

    this.clientIdMl = (newValue?.clientIdMl !== undefined && newValue.clientIdMl !== oldValue.clientIdMl) ? newValue.clientIdMl : oldValue.clientIdMl;

    this.clientSecretMl = (newValue?.clientSecretMl !== undefined && newValue.clientSecretMl !== oldValue.clientSecretMl) ? newValue.clientSecretMl : oldValue.clientSecretMl;

    this.orgIdDesk = (newValue?.orgIdDesk !== undefined && newValue.orgIdDesk !== oldValue.orgIdDesk) ? newValue.orgIdDesk : oldValue.orgIdDesk;

    this.refreshTokenZoho = (newValue?.refreshTokenZoho !== undefined && newValue.refreshTokenZoho !== oldValue.refreshTokenZoho) ? newValue.refreshTokenZoho : oldValue.refreshTokenZoho;

    this.accessTokenZoho = (newValue?.accessTokenZoho !== undefined && newValue.accessTokenZoho !== oldValue.accessTokenZoho) ? newValue.accessTokenZoho : oldValue.accessTokenZoho;

    this.departmentIdZohoDesk = (newValue?.departmentIdZohoDesk !== undefined && newValue.departmentIdZohoDesk !== oldValue.departmentIdZohoDesk) ? newValue.departmentIdZohoDesk : oldValue.departmentIdZohoDesk;

    this.contactIdZohoDesk = (newValue?.contactIdZohoDesk !== undefined && newValue.contactIdZohoDesk !== oldValue.contactIdZohoDesk) ? newValue.contactIdZohoDesk : oldValue.contactIdZohoDesk;
  }
}
