import { IMercadoLivre } from "../../interfaces/mercado-livre-interface";

export class MercadoLivreModel {
  orgId: string;
  clientSecretML: string;
  accessTokenMl?: string; // O 'accessTokenMl' continua opcional
  clientIdMl: string;
  refreshTokenMl: string;
  text?: string;
  id?: string;

  constructor(value: IMercadoLivre) {
    this.orgId = value.orgId;
    this.clientSecretML = value.clientSecretML;
    this.clientIdMl = value.clientIdMl;
    this.refreshTokenMl = value.refreshTokenMl;

    this.accessTokenMl = value.accessTokenMl;
    this.text = value.text;
    this.id = value.id;
  }
}