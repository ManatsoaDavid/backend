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
exports.SqPractitioner = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const SqAgenda_1 = __importDefault(require("./SqAgenda"));
const SqAppointment_1 = __importDefault(require("./SqAppointment"));
const SqSubscription_1 = require("./SqSubscription");
const SqUser_1 = require("./SqUser");
let SqPractitioner = class SqPractitioner extends sequelize_typescript_1.Model {
};
exports.SqPractitioner = SqPractitioner;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqPractitioner.prototype, "practitionerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqUser_1.SqUser),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqPractitioner.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqUser_1.SqUser, 'userId'),
    __metadata("design:type", SqUser_1.SqUser)
], SqPractitioner.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "idCardImage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "residenceCertificate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "officeAddress", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "specialty", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "diploma", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "nationalOrder", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqPractitioner.prototype, "registrationNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqAgenda_1.default),
    __metadata("design:type", Array)
], SqPractitioner.prototype, "agendas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqSubscription_1.SqSubscription),
    __metadata("design:type", Array)
], SqPractitioner.prototype, "subscriptions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqAppointment_1.default, {
        foreignKey: 'practitionerId',
        as: 'practitionerAppointments'
    }),
    __metadata("design:type", Array)
], SqPractitioner.prototype, "appointments", void 0);
exports.SqPractitioner = SqPractitioner = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "practitioners",
        timestamps: true,
    })
], SqPractitioner);
exports.default = SqPractitioner;
