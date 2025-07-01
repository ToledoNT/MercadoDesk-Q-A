export class ProdutoMercadoLivreModel {
  id: string;
  title: string;
  link: string;
  constructor(data: any) {
    this.id = data?.id ?? "";
    this.title = data?.title ?? "";
    this.link = data?.permalink;
  }
}
