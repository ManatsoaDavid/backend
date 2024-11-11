"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("../controllers/subscription.controller");
const subscription_service_1 = require("../services/subscription.service");
const subscriptionRoutes = express_1.default.Router();
const subscriptionService = new subscription_service_1.SubscriptionService();
const subscriptionController = new subscription_controller_1.SubscriptionController(subscriptionService);
// Routes principales
subscriptionRoutes.post('/', subscriptionController.createSubscription.bind(subscriptionController));
subscriptionRoutes.get('/allSubscription', subscriptionController.getSubscriptions.bind(subscriptionController));
subscriptionRoutes.get('/stats', subscriptionController.getSubscriptionStats.bind(subscriptionController));
subscriptionRoutes.get('/status/:practitionerId', subscriptionController.checkSubscriptionStatus.bind(subscriptionController));
subscriptionRoutes.get('/practitioners', subscriptionController.getPractitionersWithSubscriptions.bind(subscriptionController));
// Routes de gestion
subscriptionRoutes.post('/renew/:subscriptionId', subscriptionController.renewSubscription.bind(subscriptionController));
subscriptionRoutes.get('/history/:subscriptionId', subscriptionController.getSubscriptionHistory.bind(subscriptionController));
exports.default = subscriptionRoutes;
