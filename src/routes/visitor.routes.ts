import express from 'express';
import { VisitorController } from '../controllers/visitor.controller';
import { VisitorService } from '../services/visitor.service';

const visitorRoutes = express.Router();
const visitorService = new VisitorService();
const visitorController = new VisitorController(visitorService);

visitorRoutes.get('/all', (req, res) => visitorController.getAllVisitors(req, res));
visitorRoutes.get('/:id', (req, res) => visitorController.getVisitorById(req, res));
visitorRoutes.put('/:id', (req, res) => visitorController.updateVisitor(req, res));
visitorRoutes.delete('/:id', (req, res) => visitorController.deleteVisitor(req, res));
visitorRoutes.get('/stat/counts', (req, res) => visitorController.getVisitorCount(req, res));


export default visitorRoutes;
