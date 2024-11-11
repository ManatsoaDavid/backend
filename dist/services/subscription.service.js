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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const sequelize_1 = require("sequelize");
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const SqSubscription_1 = require("../sequelize-model/SqSubscription");
const SqSubscriptionCycle_1 = require("../sequelize-model/SqSubscriptionCycle");
const SqSubscriptionHistory_1 = require("../sequelize-model/SqSubscriptionHistory");
const SqSubscriptionType_1 = require("../sequelize-model/SqSubscriptionType");
const error_1 = require("../util/error");
const error_messages_1 = require("../util/error-messages");
const subscriptionCycle_service_1 = require("./subscriptionCycle.service");
const subscriptionType_service_1 = require("./subscriptionType.service");
const SqUser_1 = __importDefault(require("../sequelize-model/SqUser"));
class SubscriptionService {
    constructor() {
        this.subscriptionCycleService = new subscriptionCycle_service_1.SubscriptionCycleService();
        this.subscriptionTypeService = new subscriptionType_service_1.SubscriptionTypeService();
    }
    createSubscription(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { practitionerId, subscriptionTypeId, subscriptionCycleId, amount } = data;
                const practitioner = yield SqPractitioner_1.default.findByPk(practitionerId);
                if (!practitioner) {
                    throw new error_1.CustomError(404, "Practitioner not found");
                }
                const startDate = Date.now();
                const endDate = yield this.subscriptionCycleService.calculateEndDate(startDate, subscriptionCycleId);
                const subscription = yield SqSubscription_1.SqSubscription.create({
                    practitionerId,
                    subscriptionTypeId,
                    subscriptionCycleId,
                    startDate,
                    endDate,
                    amount,
                    status: 'active'
                });
                yield SqSubscriptionHistory_1.SqSubscriptionHistory.create({
                    subscriptionId: subscription.get('subscriptionId'),
                    field: 'creation',
                    oldValue: null,
                    newValue: JSON.stringify(subscription.toJSON()),
                    changeDate: Date.now()
                });
                return subscription.get({ plain: true });
            }
            catch (error) {
                if (error instanceof error_1.CustomError)
                    throw error;
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_CREATE_ERROR);
            }
        });
    }
    getAllSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield SqSubscription_1.SqSubscription.findAll({
                    include: [
                        { model: SqSubscriptionType_1.SqSubscriptionType, as: 'type' },
                        { model: SqSubscriptionCycle_1.SqSubscriptionCycle, as: 'cycle' },
                    ],
                });
                return subscriptions.map((subscription) => subscription.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
            }
        });
    }
    isSubscriptionActive(practitionerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield SqSubscription_1.SqSubscription.findOne({
                    where: {
                        practitionerId,
                        status: 'active',
                        endDate: { [sequelize_1.Op.gt]: Date.now() }
                    },
                    include: [
                        { model: SqSubscriptionType_1.SqSubscriptionType, as: 'type' },
                        { model: SqSubscriptionCycle_1.SqSubscriptionCycle, as: 'cycle' }
                    ]
                });
                if (!subscription) {
                    return { isActive: false, remainingDays: 0 };
                }
                const remainingDays = Math.ceil((subscription.get('endDate') - Date.now()) / (1000 * 60 * 60 * 24));
                return {
                    isActive: true,
                    remainingDays,
                    subscriptionDetails: subscription.get({ plain: true })
                };
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
            }
        });
    }
    getDetailedStats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = Date.now();
                const weekFromNow = currentDate + 7 * 24 * 60 * 60 * 1000;
                const [total, active, expiring, revenue, typeStats] = yield Promise.all([
                    SqSubscription_1.SqSubscription.count(),
                    SqSubscription_1.SqSubscription.count({ where: { status: 'active' } }),
                    SqSubscription_1.SqSubscription.count({
                        where: {
                            status: 'active',
                            endDate: { [sequelize_1.Op.between]: [currentDate, weekFromNow] }
                        }
                    }),
                    SqSubscription_1.SqSubscription.sum('amount', {
                        where: {
                            startDate: { [sequelize_1.Op.gte]: new Date().setDate(1) }
                        }
                    }),
                    SqSubscription_1.SqSubscription.findAll({
                        attributes: [
                            'subscriptionTypeId',
                            [sequelize_1.Sequelize.fn('COUNT', '*'), 'count']
                        ],
                        group: ['subscriptionTypeId'],
                        include: [{ model: SqSubscriptionType_1.SqSubscriptionType, as: 'type' }]
                    })
                ]);
                const subscriptionsByType = {};
                typeStats.forEach(stat => {
                    var _a;
                    const typeName = ((_a = stat.get('type')) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown';
                    subscriptionsByType[typeName] = Number(stat.get('count')) || 0;
                });
                return {
                    totalSubscriptions: total || 0,
                    activeSubscriptions: active || 0,
                    monthlyRevenue: revenue || 0,
                    expiringThisWeek: expiring || 0,
                    subscriptionsByType
                };
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
            }
        });
    }
    renewSubscription(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSubscription = yield SqSubscription_1.SqSubscription.findByPk(subscriptionId);
                if (!currentSubscription) {
                    throw new error_1.CustomError(404, 'Subscription not found');
                }
                const newSubscription = yield this.createSubscription({
                    practitionerId: currentSubscription.get('practitionerId'),
                    subscriptionTypeId: currentSubscription.get('subscriptionTypeId'),
                    subscriptionCycleId: currentSubscription.get('subscriptionCycleId'),
                    amount: currentSubscription.get('amount')
                });
                if (!newSubscription.subscriptionId) {
                    throw new error_1.CustomError(500, "Failed to create new subscription");
                }
                yield SqSubscriptionHistory_1.SqSubscriptionHistory.create({
                    subscriptionId: newSubscription.subscriptionId,
                    field: 'renewal',
                    oldValue: subscriptionId.toString(),
                    newValue: newSubscription.subscriptionId.toString(),
                    changeDate: Date.now()
                });
                return newSubscription;
            }
            catch (error) {
                if (error instanceof error_1.CustomError)
                    throw error;
                throw new error_1.CustomError(500, "Erreur de serveur lors de la renouvellement de la souscription");
            }
        });
    }
    getSubscriptionHistory(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield SqSubscriptionHistory_1.SqSubscriptionHistory.findAll({
                    where: { subscriptionId },
                    order: [['changeDate', 'DESC']]
                });
                return history.map(entry => entry.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, "Erreur de serveur lors de la récupération de l'historique de souscription");
            }
        });
    }
    getPractitionersWithSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practitioners = yield SqPractitioner_1.default.findAll({
                    include: [
                        {
                            model: SqUser_1.default,
                            attributes: ['name', 'firstName', 'email', 'contact']
                        },
                        {
                            model: SqSubscription_1.SqSubscription,
                            include: [
                                { model: SqSubscriptionType_1.SqSubscriptionType, as: 'type' },
                                { model: SqSubscriptionCycle_1.SqSubscriptionCycle, as: 'cycle' }
                            ]
                        }
                    ]
                });
                return practitioners.map(practitioner => ({
                    practitioner: {
                        id: practitioner.get('practitionerId'),
                        user: practitioner.get('user'),
                        speciality: practitioner.get('speciality')
                    },
                    subscriptions: practitioner.get('subscriptions')
                }));
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
            }
        });
    }
}
exports.SubscriptionService = SubscriptionService;
