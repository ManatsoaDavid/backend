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
exports.SubscriptionTypeController = void 0;
const error_1 = require("../util/error");
class SubscriptionTypeController {
    constructor(subscriptionTypeService) {
        this.subscriptionTypeService = subscriptionTypeService;
    }
    createSubscriptionType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionTypeData = req.body;
                const newSubscriptionType = yield this.subscriptionTypeService.createSubscriptionType(subscriptionTypeData);
                response = {
                    success: true,
                    data: newSubscriptionType,
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
                    response.message = 'An error occurred while creating the subscription type';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getSubscriptionTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionTypes = yield this.subscriptionTypeService.getAllSubscriptionTypes();
                response = {
                    success: true,
                    data: subscriptionTypes,
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
    getSubscriptionTypeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionTypeId = parseInt(req.params.id, 10);
                const subscriptionType = yield this.subscriptionTypeService.getSubscriptionTypeById(subscriptionTypeId);
                response = {
                    success: true,
                    data: subscriptionType,
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
    updateSubscriptionType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionTypeId = parseInt(req.params.id, 10);
                const subscriptionTypeData = req.body;
                const updatedSubscriptionType = yield this.subscriptionTypeService.updateSubscriptionType(subscriptionTypeId, subscriptionTypeData);
                response = {
                    success: true,
                    data: updatedSubscriptionType,
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
    deleteSubscriptionType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptionTypeId = parseInt(req.params.id, 10);
                yield this.subscriptionTypeService.deleteSubscriptionType(subscriptionTypeId);
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
exports.SubscriptionTypeController = SubscriptionTypeController;
