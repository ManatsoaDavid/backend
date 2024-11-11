"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const availability_controller_1 = require("../controllers/availability.controller");
const availability_service_1 = require("../services/availability.service");
const availabilityRoutes = express_1.default.Router();
const availabilityController = new availability_controller_1.AvailabilityController(new availability_service_1.AvailabilityService());
availabilityRoutes.post('/', (req, res) => availabilityController.createAvailability(req, res));
availabilityRoutes.get('/availability', (req, res) => availabilityController.getAvailabilities(req, res));
availabilityRoutes.put('/availability/:id', (req, res) => availabilityController.updateAvailability(req, res));
availabilityRoutes.delete('/availability/:id', (req, res) => availabilityController.deleteAvailability(req, res));
exports.default = availabilityRoutes;
