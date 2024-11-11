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
exports.SubscriptionCycleController = void 0;
const error_1 = require("../util/error");
class SubscriptionCycleController {
    constructor(subscriptionCycleService) {
        this.subscriptionCycleService = subscriptionCycleService;
    }
    createSubscriptionCycle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionCycleData = req.body;
                const newSubscriptionCycle = yield this.subscriptionCycleService.createSubscriptionCycle(subscriptionCycleData);
                response = {
                    success: true,
                    data: newSubscriptionCycle,
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
                    response.message = 'An error occurred while creating the subscription cycle';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getSubscriptionCycles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionCycles = yield this.subscriptionCycleService.getAllSubscriptionCycles();
                response = {
                    success: true,
                    data: subscriptionCycles,
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
    getSubscriptionCycleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionCycleId = parseInt(req.params.id, 10);
                const subscriptionCycle = yield this.subscriptionCycleService.getSubscriptionCycleById(subscriptionCycleId);
                response = {
                    success: true,
                    data: subscriptionCycle,
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
    updateSubscriptionCycle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionCycleId = parseInt(req.params.id, 10);
                const subscriptionCycleData = req.body;
                const updatedSubscriptionCycle = yield this.subscriptionCycleService.updateSubscriptionCycle(subscriptionCycleId, subscriptionCycleData);
                response = {
                    success: true,
                    data: updatedSubscriptionCycle,
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
    deleteSubscriptionCycle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionCycleId = parseInt(req.params.id, 10);
                yield this.subscriptionCycleService.deleteSubscriptionCycle(subscriptionCycleId);
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
exports.SubscriptionCycleController = SubscriptionCycleController;
