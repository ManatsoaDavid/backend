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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqSubscriptionType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const enums_1 = require("../models/enums");
const SqSubscription_1 = require("./SqSubscription");
let SqSubscriptionType = class SqSubscriptionType extends sequelize_typescript_1.Model {
};
exports.SqSubscriptionType = SqSubscriptionType;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscriptionType.prototype, "subscriptionTypeId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqSubscriptionType.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], SqSubscriptionType.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqSubscriptionType.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqSubscription_1.SqSubscription),
    __metadata("design:type", Array)
], SqSubscriptionType.prototype, "subscriptions", void 0);
exports.SqSubscriptionType = SqSubscriptionType = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'subscriptionTypes',
        timestamps: true,
    })
], SqSubscriptionType);
