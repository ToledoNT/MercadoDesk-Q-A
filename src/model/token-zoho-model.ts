export class TokenZohoModel {
  accessToken: string;
  constructor(value: any) {
    this.accessToken = value?.data?.access_token
      ? value?.data?.access_token
      : "";
  }
}
