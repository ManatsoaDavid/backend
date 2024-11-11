"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionType_controller_1 = require("../controllers/subscriptionType.controller");
const subscriptionType_service_1 = require("../services/subscriptionType.service");
const subscriptionTypeRoutes = express_1.default.Router();
const subscriptionTypeService = new subscriptionType_service_1.SubscriptionTypeService();
const subscriptionTypeController = new subscriptionType_controller_1.SubscriptionTypeController(subscriptionTypeService);
subscriptionTypeRoutes.post('/', subscriptionTypeController.createSubscriptionType.bind(subscriptionTypeController));
subscriptionTypeRoutes.get('/', subscriptionTypeController.getSubscriptionTypes.bind(subscriptionTypeController));
subscriptionTypeRoutes.get('/:id', subscriptionTypeController.getSubscriptionTypeById.bind(subscriptionTypeController));
subscriptionTypeRoutes.put('/:id', subscriptionTypeController.updateSubscriptionType.bind(subscriptionTypeController));
subscriptionTypeRoutes.delete('/:id', subscriptionTypeController.deleteSubscriptionType.bind(subscriptionTypeController));
exports.default = subscriptionTypeRoutes;
