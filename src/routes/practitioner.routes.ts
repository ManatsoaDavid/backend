import express from 'express';
import { PractitionerController } from '../controllers/practitioner.controller';

const practitionerRoutes = express.Router();
const practitionerController = new PractitionerController();

practitionerRoutes.get('/', (req, res) => practitionerController.getAllPractitioners(req, res));
practitionerRoutes.get('/:id', (req, res) => practitionerController.getPractitionerById(req, res));
practitionerRoutes.post('/', (req, res) => practitionerController.createPractitioner(req, res));
practitionerRoutes.put('/:id', (req, res) => practitionerController.updatePractitioner(req, res));
practitionerRoutes.delete('/:id', (req, res) => practitionerController.deletePractitioner(req, res));
practitionerRoutes.get('/stat/counts', (req, res) => practitionerController.getPractitionerCount(req, res));

export default practitionerRoutes;
