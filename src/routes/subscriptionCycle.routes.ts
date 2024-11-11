import express from 'express';
import { SubscriptionCycleController } from '../controllers/subscriptionCycle.controller';
import { SubscriptionCycleService } from '../services/subscriptionCycle.service';

const subscriptionCycleRoutes = express.Router();
const subscriptionCycleService = new SubscriptionCycleService();
const subscriptionCycleController = new SubscriptionCycleController(subscriptionCycleService);

subscriptionCycleRoutes.post('/', subscriptionCycleController.createSubscriptionCycle.bind(subscriptionCycleController));
subscriptionCycleRoutes.get('/', subscriptionCycleController.getSubscriptionCycles.bind(subscriptionCycleController));
subscriptionCycleRoutes.get('/:id', subscriptionCycleController.getSubscriptionCycleById.bind(subscriptionCycleController));
subscriptionCycleRoutes.put('/:id', subscriptionCycleController.updateSubscriptionCycle.bind(subscriptionCycleController));
subscriptionCycleRoutes.delete('/:id', subscriptionCycleController.deleteSubscriptionCycle.bind(subscriptionCycleController));

export default subscriptionCycleRoutes;
