import { IFetchCliente } from "../../interface/user/fetch-user-interface";

export class FetchClienteModel {
  id: string;
  name: string;
  email: string;
 
  constructor(value: IFetchCliente) {
    this.id = value.id;
    this.name = value.name;
    this.email = value.email;
 
  }
}
