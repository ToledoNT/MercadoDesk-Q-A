import cron from "node-cron";
import { CreateTokenApiMercadoLivre } from "../use-cases/token/mercado-livre/create-token-mercado-livre";

async function renovarToken(): Promise<void> {
  const tokenUseCase = new CreateTokenApiMercadoLivre();
  const result = await tokenUseCase.execute();
  if (result) {
    console.log("Token do mercado livre renovado com sucesso!");
  } else {
    console.error("Falha na renovação do token do Mercado Livre:", result);
  }
}

renovarToken().catch(error => {
  console.error("Erro na execução imediata da renovação:", error);
});

cron.schedule("0 */6 * * *", () => {
  renovarToken().catch(error => {
    console.error("Erro na execução agendada da renovação:", error);
  });
});