import express from 'express';
import { SubscriptionTypeController } from '../controllers/subscriptionType.controller';
import { SubscriptionTypeService } from '../services/subscriptionType.service';

const subscriptionTypeRoutes = express.Router();
const subscriptionTypeService = new SubscriptionTypeService();
const subscriptionTypeController = new SubscriptionTypeController(subscriptionTypeService);

subscriptionTypeRoutes.post('/', subscriptionTypeController.createSubscriptionType.bind(subscriptionTypeController));
subscriptionTypeRoutes.get('/', subscriptionTypeController.getSubscriptionTypes.bind(subscriptionTypeController));
subscriptionTypeRoutes.get('/:id', subscriptionTypeController.getSubscriptionTypeById.bind(subscriptionTypeController));
subscriptionTypeRoutes.put('/:id', subscriptionTypeController.updateSubscriptionType.bind(subscriptionTypeController));
subscriptionTypeRoutes.delete('/:id', subscriptionTypeController.deleteSubscriptionType.bind(subscriptionTypeController));

export default subscriptionTypeRoutes;
