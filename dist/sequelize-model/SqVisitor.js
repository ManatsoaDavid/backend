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
exports.SqVisitor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const SqUser_1 = require("./SqUser");
const SqAppointment_1 = require("./SqAppointment");
let SqVisitor = class SqVisitor extends sequelize_typescript_1.Model {
};
exports.SqVisitor = SqVisitor;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqVisitor.prototype, "visitorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqUser_1.SqUser),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqVisitor.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqUser_1.SqUser, "userId"),
    __metadata("design:type", Object)
], SqVisitor.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqAppointment_1.SqAppointment),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqVisitor.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqAppointment_1.SqAppointment, "appointmentId"),
    __metadata("design:type", SqAppointment_1.SqAppointment)
], SqVisitor.prototype, "appointment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqVisitor.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqAppointment_1.SqAppointment, { foreignKey: 'visitorId', as: 'visitorAppointments' }),
    __metadata("design:type", Array)
], SqVisitor.prototype, "appointments", void 0);
exports.SqVisitor = SqVisitor = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "visitor",
        timestamps: false,
    })
], SqVisitor);
exports.default = SqUser_1.SqUser;
