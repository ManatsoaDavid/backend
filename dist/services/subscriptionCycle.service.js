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
exports.SubscriptionCycleService = void 0;
const SqSubscriptionCycle_1 = require("../sequelize-model/SqSubscriptionCycle");
const error_1 = require("../util/error");
const error_messages_1 = require("../util/error-messages");
class SubscriptionCycleService {
    createSubscriptionCycle(subscriptionCycleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cycle, duration } = subscriptionCycleData;
                if (!cycle || !duration) {
                    throw new error_1.CustomError(400, error_messages_1.ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
                }
                const subscriptionCycle = yield SqSubscriptionCycle_1.SqSubscriptionCycle.create({
                    cycle,
                    duration,
                });
                return subscriptionCycle.get({ plain: true });
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, "");
                }
            }
        });
    }
    getAllSubscriptionCycles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionCycles = yield SqSubscriptionCycle_1.SqSubscriptionCycle.findAll();
                return subscriptionCycles.map((subscriptionCycle) => subscriptionCycle.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_CYCLE_FETCH_ERROR);
            }
        });
    }
    getSubscriptionCycleById(subscriptionCycleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionCycle = yield SqSubscriptionCycle_1.SqSubscriptionCycle.findByPk(subscriptionCycleId);
                if (!subscriptionCycle) {
                    throw new error_1.CustomError(404, 'Subscription cycle not found');
                }
                return subscriptionCycle.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateSubscriptionCycle(subscriptionCycleId, subscriptionCycleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionCycle = yield SqSubscriptionCycle_1.SqSubscriptionCycle.findByPk(subscriptionCycleId);
                if (!subscriptionCycle) {
                    throw new error_1.CustomError(404, 'Subscription cycle not found');
                }
                yield subscriptionCycle.update(subscriptionCycleData);
                return subscriptionCycle.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteSubscriptionCycle(subscriptionCycleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionCycle = yield SqSubscriptionCycle_1.SqSubscriptionCycle.findByPk(subscriptionCycleId);
                if (!subscriptionCycle) {
                    throw new error_1.CustomError(404, 'Subscription cycle not found');
                }
                yield subscriptionCycle.destroy();
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_CYCLE_DELETE_ERROR);
                }
            }
        });
    }
    calculateEndDate(startDate, subscriptionCycleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionCycle = yield SqSubscriptionCycle_1.SqSubscriptionCycle.findByPk(subscriptionCycleId);
                if (!subscriptionCycle) {
                    throw new error_1.CustomError(404, 'Subscription cycle not found');
                }
                const endDate = new Date(startDate);
                if (subscriptionCycle.cycle) {
                    endDate.setDate(endDate.getDate() + (subscriptionCycle.duration));
                }
                else {
                    throw new error_1.CustomError(500, "Invalid subscription cycle");
                }
                return endDate.getTime();
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, "Server error");
                }
            }
        });
    }
}
exports.SubscriptionCycleService = SubscriptionCycleService;
