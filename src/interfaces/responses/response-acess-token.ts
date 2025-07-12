import { ITokenZoho } from "../token-interface"; 

export interface ResponseZohoToken {
  status: boolean;
  code: number;
  message: string;
  data: Array<ITokenZoho>;
}