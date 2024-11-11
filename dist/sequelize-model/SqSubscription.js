"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqSubscription = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const SqPractitioner_1 = __importDefault(require("./SqPractitioner"));
const SqSubscriptionCycle_1 = require("./SqSubscriptionCycle");
const SqSubscriptionType_1 = require("./SqSubscriptionType");
let SqSubscription = class SqSubscription extends sequelize_typescript_1.Model {
};
exports.SqSubscription = SqSubscription;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscription.prototype, "subscriptionId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqPractitioner_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscription.prototype, "practitionerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqSubscriptionType_1.SqSubscriptionType),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscription.prototype, "subscriptionTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqSubscriptionCycle_1.SqSubscriptionCycle),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscription.prototype, "subscriptionCycleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqSubscription.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqSubscription.prototype, "endDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqSubscription.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscription.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqSubscriptionType_1.SqSubscriptionType),
    __metadata("design:type", SqSubscriptionType_1.SqSubscriptionType)
], SqSubscription.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqSubscriptionCycle_1.SqSubscriptionCycle),
    __metadata("design:type", SqSubscriptionCycle_1.SqSubscriptionCycle)
], SqSubscription.prototype, "cycle", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqPractitioner_1.default),
    __metadata("design:type", SqPractitioner_1.default)
], SqSubscription.prototype, "practitioner", void 0);
exports.SqSubscription = SqSubscription = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'subscriptions',
        timestamps: true,
    })
], SqSubscription);
