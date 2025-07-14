import express from "express";
import Status from "./router/status-route";
import UserRoute from "./router/user-route";
import MercadoLivreRoute from "./router/mercado-livre-route";

import "./cron/zoho-token-cron";  
import "./cron/mercado-livre-token-cron"; 

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", Status);
server.use("/api", UserRoute);
server.use("/api", MercadoLivreRoute);

export { server };