import cron from "node-cron";
import { CreateTokenApiZoho } from "../use-cases/token/zoho/create-token-api.zoho";

async function renovarToken(): Promise<void> {
    const tokenUseCase = new CreateTokenApiZoho();
    const result = await tokenUseCase.execute();

    if (result) {
      console.log("Token do Zoho Desk renovado com sucesso!");
    } if(!result) {
      console.error("Falha na renovação do token da Zoho:", result);
    }
  } 

renovarToken().catch(error => {
  console.error("Erro na execução imediata da renovação:", error);
});

cron.schedule("*/55 * * * *", renovarToken);