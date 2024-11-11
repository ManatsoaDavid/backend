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
exports.SubscriptionTypeService = void 0;
const SqSubscriptionType_1 = require("../sequelize-model/SqSubscriptionType");
const error_1 = require("../util/error");
const error_messages_1 = require("../util/error-messages");
class SubscriptionTypeService {
    createSubscriptionType(subscriptionTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, price, description } = subscriptionTypeData;
                if (!type || !price) {
                    throw new error_1.CustomError(400, error_messages_1.ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
                }
                const subscriptionType = yield SqSubscriptionType_1.SqSubscriptionType.create({
                    type,
                    description,
                    price,
                });
                return subscriptionType.get({ plain: true });
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_TYPE_CREATE_ERROR);
                }
            }
        });
    }
    getAllSubscriptionTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionTypes = yield SqSubscriptionType_1.SqSubscriptionType.findAll();
                return subscriptionTypes.map((subscriptionType) => subscriptionType.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_TYPE_FETCH_ERROR);
            }
        });
    }
    getSubscriptionTypeById(subscriptionTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionType = yield SqSubscriptionType_1.SqSubscriptionType.findByPk(subscriptionTypeId);
                if (!subscriptionType) {
                    throw new error_1.CustomError(404, 'Subscription type not found');
                }
                return subscriptionType.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateSubscriptionType(subscriptionTypeId, subscriptionTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionType = yield SqSubscriptionType_1.SqSubscriptionType.findByPk(subscriptionTypeId);
                if (!subscriptionType) {
                    throw new error_1.CustomError(404, 'Subscription type not found');
                }
                yield subscriptionType.update(subscriptionTypeData);
                return subscriptionType.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteSubscriptionType(subscriptionTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionType = yield SqSubscriptionType_1.SqSubscriptionType.findByPk(subscriptionTypeId);
                if (!subscriptionType) {
                    throw new error_1.CustomError(404, 'Subscription type not found');
                }
                yield subscriptionType.destroy();
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_TYPE_DELETE_ERROR);
                }
            }
        });
    }
}
exports.SubscriptionTypeService = SubscriptionTypeService;
