"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionCycle_controller_1 = require("../controllers/subscriptionCycle.controller");
const subscriptionCycle_service_1 = require("../services/subscriptionCycle.service");
const subscriptionCycleRoutes = express_1.default.Router();
const subscriptionCycleService = new subscriptionCycle_service_1.SubscriptionCycleService();
const subscriptionCycleController = new subscriptionCycle_controller_1.SubscriptionCycleController(subscriptionCycleService);
subscriptionCycleRoutes.post('/', subscriptionCycleController.createSubscriptionCycle.bind(subscriptionCycleController));
subscriptionCycleRoutes.get('/', subscriptionCycleController.getSubscriptionCycles.bind(subscriptionCycleController));
subscriptionCycleRoutes.get('/:id', subscriptionCycleController.getSubscriptionCycleById.bind(subscriptionCycleController));
subscriptionCycleRoutes.put('/:id', subscriptionCycleController.updateSubscriptionCycle.bind(subscriptionCycleController));
subscriptionCycleRoutes.delete('/:id', subscriptionCycleController.deleteSubscriptionCycle.bind(subscriptionCycleController));
exports.default = subscriptionCycleRoutes;
