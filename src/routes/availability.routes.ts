import express, { Router } from 'express';
import { AvailabilityController } from '../controllers/availability.controller';
import { AvailabilityService } from '../services/availability.service';

const availabilityRoutes = express.Router();
const availabilityController = new AvailabilityController(new AvailabilityService());

availabilityRoutes.post('/', (req, res) => availabilityController.createAvailability(req, res));
availabilityRoutes.get('/availability', (req, res) => availabilityController.getAvailabilities(req, res));
availabilityRoutes.put('/availability/:id', (req, res) => availabilityController.updateAvailability(req, res));
availabilityRoutes.delete('/availability/:id', (req, res) => availabilityController.deleteAvailability(req, res));

export default availabilityRoutes;
