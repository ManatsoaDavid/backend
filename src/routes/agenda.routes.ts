import { Router } from 'express';
import { AgendaController } from '../controllers/agenda.controller';
import { AgendaService } from '../services/agenda.service';

const agendaRouter = Router();
const agendaService = new AgendaService();
const agendaController = new AgendaController(agendaService);

agendaRouter.post('/', (req, res) => agendaController.createAgenda(req, res));
agendaRouter.get('/', (req, res) => agendaController.getAgendas(req, res));
agendaRouter.get('/practitioner/:id', (req, res) => agendaController.getAgendaByPractitionerId(req, res));
agendaRouter.put('/:agendaId', (req, res) => agendaController.updateAgenda(req, res));
agendaRouter.delete('/practitioner/:practitionerId/:agendaId', (req, res) => agendaController.deleteAgenda(req, res));

export default agendaRouter;
