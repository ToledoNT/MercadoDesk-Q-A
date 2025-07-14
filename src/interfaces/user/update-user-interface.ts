export interface IUpdateUser {
  id: string;   
  name: string;
  email: string;
  password: string;
  accessTokenMl: string;
  refreshTokenMl: string;
  sellerIdMl: string;
  clientIdMl?: string;
  clientSecretMl?: string;
  orgIdDesk?: string;
  refreshTokenZoho: string;
  accessTokenZoho: string;
  departmentIdZohoDesk?: string;
  contactIdZohoDesk?: string;
}