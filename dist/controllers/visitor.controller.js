"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorController = void 0;
const error_1 = require("../util/error");
class VisitorController {
    constructor(visitorService) {
        this.visitorService = visitorService;
        this.createVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const visitorData = req.body;
                const visitor = yield this.visitorService.createVisitor(visitorData);
                res.status(201).json(visitor);
            }
            catch (error) {
                res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
        });
    }
    getAllVisitors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const visitors = yield this.visitorService.getAllVisitors();
                response = {
                    success: true,
                    data: visitors,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    getVisitorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const visitorId = parseInt(req.params.id, 10);
                const visitor = yield this.visitorService.getVisitorById(visitorId);
                response = {
                    success: true,
                    data: visitor,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    updateVisitor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const visitorId = parseInt(req.params.id);
                const updatedVisitor = yield this.visitorService.updateVisitor(visitorId, req.body);
                response = {
                    success: true,
                    data: updatedVisitor,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    deleteVisitor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
                message: ''
            };
            let status;
            try {
                const visitorId = parseInt(req.params.id);
                yield this.visitorService.deleteVisitor(visitorId);
                response = {
                    success: true,
                    message: 'Visiteur supprimé avec succès'
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    getVisitorCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const count = yield this.visitorService.countVisitor();
                response = {
                    success: true,
                    data: { count },
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    handleError(error, res) {
        let errorMessage = 'An unknown error occurred';
        let statusCode = 500;
        if (error instanceof error_1.CustomError) {
            errorMessage = error.message;
            statusCode = error.statusCode;
        }
        else if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
}
exports.VisitorController = VisitorController;
