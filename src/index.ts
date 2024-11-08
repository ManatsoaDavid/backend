import { Serveur } from "./serveur";
require("dotenv").config()


const server = new Serveur(parseInt(process.env.PORT as string,10) || 3002)
server.start();