"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visitor_controller_1 = require("../controllers/visitor.controller");
const visitor_service_1 = require("../services/visitor.service");
const visitorRoutes = express_1.default.Router();
const visitorService = new visitor_service_1.VisitorService();
const visitorController = new visitor_controller_1.VisitorController(visitorService);
visitorRoutes.get('/all', (req, res) => visitorController.getAllVisitors(req, res));
visitorRoutes.get('/:id', (req, res) => visitorController.getVisitorById(req, res));
visitorRoutes.put('/:id', (req, res) => visitorController.updateVisitor(req, res));
visitorRoutes.delete('/:id', (req, res) => visitorController.deleteVisitor(req, res));
visitorRoutes.get('/stat/counts', (req, res) => visitorController.getVisitorCount(req, res));
exports.default = visitorRoutes;
