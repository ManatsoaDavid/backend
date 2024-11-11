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
exports.AvailabilityController = void 0;
const error_1 = require("../util/error");
class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    createAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { agendaId, startTime, endTime, status: availabilityStatus } = req.body;
                const newAvailability = yield this.availabilityService.createAvailability({
                    agendaId,
                    startTime: new Date(startTime).getTime(),
                    endTime: new Date(endTime).getTime(),
                    status: availabilityStatus,
                });
                response = {
                    success: true,
                    data: newAvailability,
                };
                status = 201;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while creating the availability';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getAvailabilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const availabilities = yield this.availabilityService.getAvailability();
                response = {
                    success: true,
                    data: availabilities,
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
    updateAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const availabilityId = parseInt(req.params.id, 10);
                const availabilityData = req.body;
                const updatedAvailability = yield this.availabilityService.updateAvailability(availabilityId, availabilityData);
                response = {
                    success: true,
                    data: updatedAvailability,
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
    deleteAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const availabilityId = parseInt(req.params.id, 10);
                yield this.availabilityService.deleteAvailability(availabilityId);
                response = {
                    success: true,
                };
                status = 204;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    handleError(error, res) {
        if (error instanceof error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}
exports.AvailabilityController = AvailabilityController;
