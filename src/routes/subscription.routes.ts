import express from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';
import { SubscriptionService } from '../services/subscription.service';

const subscriptionRoutes = express.Router();
const subscriptionService = new SubscriptionService();
const subscriptionController = new SubscriptionController(subscriptionService);

// Routes principales
subscriptionRoutes.post('/', subscriptionController.createSubscription.bind(subscriptionController));
subscriptionRoutes.get('/allSubscription', subscriptionController.getSubscriptions.bind(subscriptionController));
subscriptionRoutes.get('/stats', subscriptionController.getSubscriptionStats.bind(subscriptionController));
subscriptionRoutes.get('/status/:practitionerId', subscriptionController.checkSubscriptionStatus.bind(subscriptionController));
subscriptionRoutes.get('/practitioners', subscriptionController.getPractitionersWithSubscriptions.bind(subscriptionController));


// Routes de gestion
subscriptionRoutes.post('/renew/:subscriptionId', subscriptionController.renewSubscription.bind(subscriptionController));
subscriptionRoutes.get('/history/:subscriptionId', subscriptionController.getSubscriptionHistory.bind(subscriptionController));

export default subscriptionRoutes;
