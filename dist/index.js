"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serveur_1 = require("./serveur");
require("dotenv").config();
const server = new serveur_1.Serveur(parseInt(process.env.PORT, 10) || 3002);
server.start();
