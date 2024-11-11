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
exports.SubscriptionController = void 0;
const error_1 = require("../util/error");
class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    createSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { success: false };
            let status;
            try {
                const subscription = yield this.subscriptionService.createSubscription(req.body);
                response = {
                    success: true,
                    data: subscription,
                };
                status = 201;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    response.message = 'Error creating subscription';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getSubscriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const subscriptions = yield this.subscriptionService.getAllSubscriptions();
                response = {
                    success: true,
                    data: subscriptions,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error checking subscription status';
                return;
            }
            res.status(status).json(response);
        });
    }
    checkSubscriptionStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { practitionerId } = req.params;
            let response = { success: false };
            let status;
            try {
                const subscriptionStatus = yield this.subscriptionService.isSubscriptionActive(parseInt(practitionerId));
                response = {
                    success: true,
                    data: subscriptionStatus,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error checking subscription status';
                status = 500;
            }
            res.status(status).json(response);
        });
    }
    getSubscriptionStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { success: false };
            let status;
            try {
                const stats = yield this.subscriptionService.getDetailedStats();
                response = {
                    success: true,
                    data: stats,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error fetching subscription stats';
                status = 500;
            }
            res.status(status).json(response);
        });
    }
    renewSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscriptionId } = req.params;
            let response = { success: false };
            let status;
            try {
                const renewedSubscription = yield this.subscriptionService.renewSubscription(parseInt(subscriptionId));
                response = {
                    success: true,
                    data: renewedSubscription,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error renewing subscription';
                status = 500;
            }
            res.status(status).json(response);
        });
    }
    getSubscriptionHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscriptionId } = req.params;
            let response = { success: false };
            let status;
            try {
                const history = yield this.subscriptionService.getSubscriptionHistory(parseInt(subscriptionId));
                response = {
                    success: true,
                    data: history,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error fetching subscription history';
                status = 500;
            }
            res.status(status).json(response);
        });
    }
    getPractitionersWithSubscriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { success: false };
            let status;
            try {
                const practitioners = yield this.subscriptionService.getPractitionersWithSubscriptions();
                response = {
                    success: true,
                    data: practitioners,
                };
                status = 200;
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : 'Error fetching practitioners subscriptions';
                status = 500;
            }
            res.status(status).json(response);
        });
    }
}
exports.SubscriptionController = SubscriptionController;
