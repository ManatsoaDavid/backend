import express from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';
import { SubscriptionService } from '../services/subscription.service';

const subscriptionRoutes = express.Router();
const subscriptionService = new SubscriptionService();
const subscriptionController = new SubscriptionController(subscriptionService);

subscriptionRoutes.post('/', subscriptionController.createSubscription.bind(subscriptionController));
subscriptionRoutes.get('/allSubscription', subscriptionController.getSubscriptions.bind(subscriptionController));
subscriptionRoutes.get('/:id', subscriptionController.getSubscriptionById.bind(subscriptionController));
subscriptionRoutes.get('/practitioner/:practitionerId', subscriptionController.getSubscriptionsByPractitioner);
subscriptionRoutes.put('/:id', subscriptionController.updateSubscription.bind(subscriptionController));
subscriptionRoutes.delete('/:id', subscriptionController.deleteSubscription.bind(subscriptionController));
subscriptionRoutes.get('/subscription/expiring', subscriptionController.checkExpiringSubscriptions.bind(subscriptionController));
subscriptionRoutes.get('/subscription/amount', subscriptionController.getTotalRevenue.bind(subscriptionController));

export default subscriptionRoutes;
