export class CreateUserModel {
  name: string;
  email: string;

  constructor(value: any) {
    this.name = value?.nome ?? "";
    this.email = value?.email ?? "";
  }
}
