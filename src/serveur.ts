import cors from "cors";
import express, { Express } from "express";
import { Server as HTTPServer, createServer } from "http";
import multer from "multer";
import { Sequelize } from "sequelize-typescript";
import { login } from "./controllers/ControlleurAdminLogin";
import { deleteDemande } from "./controllers/controleurDeleteDemande";
import { afficherPraticien } from "./controllers/controlleurAfficherPraticient";
import { envoyerEmail } from "./controllers/controlleurEnvoieMail";
import { updateEtatPraticien } from "./controllers/controlleurUpdateEtat";
import agendaRouter from "./routes/agenda.routes";
import appointmentRoutes from "./routes/appointment.routes";
import authRoutes from "./routes/auth.routes";
import availabilityRoutes from "./routes/availability.routes";
import practitionerRoutes from "./routes/practitioner.routes";
import router from "./routes/router";
import subscriptionRoutes from "./routes/subscription.routes";
import subscriptionCycleRoutes from "./routes/subscriptionCycle.routes";
import subscriptionTypeRoutes from "./routes/subscriptionType.routes";
import userRoutes from "./routes/user.routes";
import visitorRoutes from "./routes/visitor.routes";
import reviewRoutes from "./routes/review.routes";

/******************************************************* */
/**
 * The `path` module provides utilities for working with file and directory paths.
 * This `require('path')` statement imports the `path` module, which can be used
 * to perform operations on file and directory paths, such as joining, resolving,
 * and normalizing paths.
 */
const path = require('path');


/********************CONFIGURATION DU SERVEUR*********************************** */
export class Serveur {
  readonly port: number;
  private app: Express;
  private server!: HTTPServer;
  private sequelize!: Sequelize;


  /*********************STOCKER LES IMAGES DANS LE SERVER**************************** */
  private storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, path.join(__dirname, './uploads'));
    },
    filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  private upload = multer({ storage: this.storage });

  /************************CONSTRUCTEUR****************************** */
  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.configServer();
  }

  /*************************CONFIGURATION DE L'EN TETE******************************** */
  private configServer() {
    const corsOptions = {
      origin: "*",
    };
    this.app.use(cors(corsOptions));

    this.configDatabase();
    this.configRoutes();
    this.configSocketServer();
  }

  private configSocketServer() {
    this.server = createServer(this.app);
  }


  /************************CONFIGURATION DES ROUTES OU API***************************** */
  private configRoutes() {
    this.app.use(express.json());
    this.app.use("/api", router);
    this.app.use("/api/login", login);
    this.app.use("/api/praticien", afficherPraticien);
    this.app.put("/api/update/:id", updateEtatPraticien);
    this.app.post("/api/envoyer-email", envoyerEmail);
    this.app.delete("/api/delete/:userId", deleteDemande);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/practitioners", practitionerRoutes);
    this.app.use('/api/availability', availabilityRoutes);
    this.app.use('/api/agenda', agendaRouter);
    this.app.use('/api/appointment', appointmentRoutes);
    this.app.use('/api/visitor', visitorRoutes)
    this.app.use('/api/subscription', subscriptionRoutes);
    this.app.use('/api/subscriptionCycle', subscriptionCycleRoutes);
    this.app.use('/api/subscriptionType', subscriptionTypeRoutes);
    this.app.use('/api/review', reviewRoutes);



    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    this.app.post('/api/upload', this.upload.single('file'), (req, res) => {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      const filePath = `${req.file.filename}`;
      res.json({ filePath });
    });
  }

  /***************************CONFIGURATION DE LA BASE DE DONNEES**************************************** */
  private configDatabase() {
    try {
      this.sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3305,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [__dirname + "/sequelize-model"]
      });
    } catch (error) {
      console.error("Database configuration error:", error);
      throw error;
    }
  }

  /*******************************DEMARAGE DU SERVEUR******************************** */
  async start() {
    try {
      await this.sequelize.sync();
      await new Promise<void>((resolve) => {
        this.server.listen(this.port, () => {
          console.log(`Serveur lancé sur le port ${this.port}`);
          resolve();
        });
      });
    } catch (error) {
      console.error("Server start error:", error);
      throw error;
    }
  }
}
