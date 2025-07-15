import express, { Router } from "express";
import { SendResponseMlController } from "../controller/mercado-livre/send-response-ml-controller";
import { GetUnansweredQuestionsController } from "../controller/mercado-livre/get-questions-controller";
const router = Router();
router.post(
  "/mercado-livre/consultToken/:orgID/:id",
  new SendResponseMlController().handle
);

router.post(
  "/mercado-livre/questions/:orgID",
  new GetUnansweredQuestionsController().handle
);

export default router;