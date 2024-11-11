"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serveur = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const multer_1 = __importDefault(require("multer"));
const sequelize_typescript_1 = require("sequelize-typescript");
const ControlleurAdminLogin_1 = require("./controllers/ControlleurAdminLogin");
const controleurDeleteDemande_1 = require("./controllers/controleurDeleteDemande");
const controlleurAfficherPraticient_1 = require("./controllers/controlleurAfficherPraticient");
const controlleurEnvoieMail_1 = require("./controllers/controlleurEnvoieMail");
const controlleurUpdateEtat_1 = require("./controllers/controlleurUpdateEtat");
const agenda_routes_1 = __importDefault(require("./routes/agenda.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const availability_routes_1 = __importDefault(require("./routes/availability.routes"));
const practitioner_routes_1 = __importDefault(require("./routes/practitioner.routes"));
const router_1 = __importDefault(require("./routes/router"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const subscriptionCycle_routes_1 = __importDefault(require("./routes/subscriptionCycle.routes"));
const subscriptionType_routes_1 = __importDefault(require("./routes/subscriptionType.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const visitor_routes_1 = __importDefault(require("./routes/visitor.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
/******************************************************* */
/**
 * The `path` module provides utilities for working with file and directory paths.
 * This `require('path')` statement imports the `path` module, which can be used
 * to perform operations on file and directory paths, such as joining, resolving,
 * and normalizing paths.
 */
const path = require('path');
/********************CONFIGURATION DU SERVEUR*********************************** */
class Serveur {
    /************************CONSTRUCTEUR****************************** */
    constructor(port) {
        /*********************STOCKER LES IMAGES DANS LE SERVER**************************** */
        this.storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, './uploads'));
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        });
        this.upload = (0, multer_1.default)({ storage: this.storage });
        this.port = port;
        this.app = (0, express_1.default)();
        this.configServer();
    }
    /*************************CONFIGURATION DE L'EN TETE******************************** */
    configServer() {
        const corsOptions = {
            origin: "*",
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.configDatabase();
        this.configRoutes();
        this.configSocketServer();
    }
    configSocketServer() {
        this.server = (0, http_1.createServer)(this.app);
    }
    /************************CONFIGURATION DES ROUTES OU API***************************** */
    configRoutes() {
        this.app.use(express_1.default.json());
        this.app.use("/api", router_1.default);
        this.app.use("/api/login", ControlleurAdminLogin_1.login);
        this.app.use("/api/praticien", controlleurAfficherPraticient_1.afficherPraticien);
        this.app.put("/api/update/:id", controlleurUpdateEtat_1.updateEtatPraticien);
        this.app.post("/api/envoyer-email", controlleurEnvoieMail_1.envoyerEmail);
        this.app.delete("/api/delete/:userId", controleurDeleteDemande_1.deleteDemande);
        this.app.use("/api/auth", auth_routes_1.default);
        this.app.use("/api/users", user_routes_1.default);
        this.app.use("/api/practitioners", practitioner_routes_1.default);
        this.app.use('/api/availability', availability_routes_1.default);
        this.app.use('/api/agenda', agenda_routes_1.default);
        this.app.use('/api/appointment', appointment_routes_1.default);
        this.app.use('/api/visitor', visitor_routes_1.default);
        this.app.use('/api/subscription', subscription_routes_1.default);
        this.app.use('/api/subscriptionCycle', subscriptionCycle_routes_1.default);
        this.app.use('/api/subscriptionType', subscriptionType_routes_1.default);
        this.app.use('/api/review', review_routes_1.default);
        this.app.use('/uploads', express_1.default.static(path.join(__dirname, 'uploads')));
        this.app.post('/api/upload', this.upload.single('file'), (req, res) => {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const filePath = `${req.file.filename}`;
            res.json({ filePath });
        });
    }
    /***************************CONFIGURATION DE LA BASE DE DONNEES**************************************** */
    configDatabase() {
        try {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "mysql",
                host: process.env.DB_HOST,
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3305,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [__dirname + "/sequelize-model"]
            });
        }
        catch (error) {
            console.error("Database configuration error:", error);
            throw error;
        }
    }
    /*******************************DEMARAGE DU SERVEUR******************************** */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.sync();
                yield new Promise((resolve) => {
                    this.server.listen(this.port, () => {
                        console.log(`Serveur lancé sur le port ${this.port}`);
                        resolve();
                    });
                });
            }
            catch (error) {
                console.error("Server start error:", error);
                throw error;
            }
        });
    }
}
exports.Serveur = Serveur;
