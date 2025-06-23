import { IFetchCliente } from "../../interface/user/fetch-user-interface";

export class UpdateClienteModel {
  id?: string;
  name?: string;
  email?: string;

  constructor(newValue: any, oldValue: IFetchCliente) {
    this.formatFields(newValue, oldValue);
  }

  private formatFields(newValue: any, oldValue: IFetchCliente) {
    this.id = (newValue?.id !== undefined && newValue.id !== oldValue.id) ? newValue.id : oldValue.id;

    this.name = (newValue?.nome !== undefined && newValue.nome !== oldValue.name) ? newValue.nome : oldValue.name;

    this.email = (newValue?.email !== undefined && newValue.email !== oldValue.email) ? newValue.email : oldValue.email;
  }
}
