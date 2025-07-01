export class ProdutoDeskModel {
  id?: string;
  departmentIds: string[];
  cf: {};
  productName: string;
  linkProdutoMercadoLivre?: string;
  constructor(
    departmentId: string[],
    produtoMercadoLivreId: string,
    produtoNome: string,
    linkProdutoMercadoLivre?: string,
    productDeskId?: string
  ) {
    this.formatProdutoId(productDeskId);
    this.departmentIds = departmentId;
    this.productName = produtoNome;
    this.cf = {
      cf_codigo_produto_mercado_livre: produtoMercadoLivreId,
      cf_link_do_mercado_livre: linkProdutoMercadoLivre,
    };
  }
  formatProdutoId(productDeskId?: string) {
    if (productDeskId) {
      this.id = productDeskId;
    }
  }
}
