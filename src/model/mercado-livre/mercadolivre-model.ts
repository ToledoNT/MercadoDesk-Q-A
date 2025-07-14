import { IMercadoLivre } from "../../interfaces/mercado-livre-interface";

export class MercadoLivreModel {
  orgId: string;
  clientSecretMl: string;
  accessTokenMl?: string; 
  clientIdMl: string;
  refreshTokenMl: string;
  text?: string;
  id?: string;

  constructor(value?: IMercadoLivre) {
    if (!value) {
      throw new Error("Parâmetro 'value' é obrigatório");
    }
    this.orgId = value.orgId;
    this.clientSecretMl = value.clientSecretMl;
    this.clientIdMl = value.clientIdMl;
    this.refreshTokenMl = value.refreshTokenMl;

    if (value.accessTokenMl) this.accessTokenMl = value.accessTokenMl;
    if (value.text) this.text = value.text;
    if (value.id) this.id = value.id;
  }
}