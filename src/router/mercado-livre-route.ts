import express, { Router, Request, Response } from "express";
import { CheckAllCredentialsController } from "../controller/mercado-livre/check-all-cedentials-controller.js";
import { CheckCredentialsMercadoLivreController } from "../controller/mercado-livre/check-credential-ml-controller.js";
import { CheckCredentialsZohoController } from "../controller/mercado-livre/check-credentials-zoho-controller.js";

const router = Router();

router.get(
  "/mercado-livre/all/:orgID",
  new CheckAllCredentialsController().handle
);

router.get(
  "/mercado-livre/checkml/:orgID",
  (req: Request, res: Response) => {
    new CheckCredentialsMercadoLivreController().handle(req as any, res as any);
  }
);

router.get(
  "/mercado-livre/checkzoho/:orgID",
  new CheckCredentialsZohoController().handle
);

router.post(
  "/mercado-livre/consultToken/:orgID/:id",
  new SendResponseMlController().handle
);

export default router;
