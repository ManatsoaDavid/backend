"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const practitioner_controller_1 = require("../controllers/practitioner.controller");
const practitionerRoutes = express_1.default.Router();
const practitionerController = new practitioner_controller_1.PractitionerController();
practitionerRoutes.get('/', (req, res) => practitionerController.getAllPractitioners(req, res));
practitionerRoutes.get('/:id', (req, res) => practitionerController.getPractitionerById(req, res));
practitionerRoutes.post('/', (req, res) => practitionerController.createPractitioner(req, res));
practitionerRoutes.put('/:id', (req, res) => practitionerController.updatePractitioner(req, res));
practitionerRoutes.delete('/:id', (req, res) => practitionerController.deletePractitioner(req, res));
practitionerRoutes.get('/stat/counts', (req, res) => practitionerController.getPractitionerCount(req, res));
exports.default = practitionerRoutes;
