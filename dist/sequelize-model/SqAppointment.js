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
exports.SqAppointment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const SqAvailability_1 = require("./SqAvailability");
const SqVisitor_1 = require("./SqVisitor");
let SqAppointment = class SqAppointment extends sequelize_typescript_1.Model {
};
exports.SqAppointment = SqAppointment;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAppointment.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqVisitor_1.SqVisitor),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAppointment.prototype, "visitorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqVisitor_1.SqVisitor, { as: 'appointmentVisitor' }),
    __metadata("design:type", SqVisitor_1.SqVisitor)
], SqAppointment.prototype, "visitor", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqAvailability_1.SqAvailability),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAppointment.prototype, "availabilityId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqAvailability_1.SqAvailability, { foreignKey: 'availabilityId', as: 'practitionerAppointments' }),
    __metadata("design:type", SqAvailability_1.SqAvailability)
], SqAppointment.prototype, "availability", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAppointment.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAppointment.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAppointment.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAppointment.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAppointment.prototype, "dateAppointment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAppointment.prototype, "rejectionReason", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAppointment.prototype, "postponedDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAppointment.prototype, "cancellationReason", void 0);
exports.SqAppointment = SqAppointment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "appointments",
        createdAt: false,
        updatedAt: false,
    })
], SqAppointment);
exports.default = SqAppointment;
