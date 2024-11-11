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
exports.SqAgenda = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const SqAvailability_1 = require("./SqAvailability");
const SqPractitioner_1 = require("./SqPractitioner");
let SqAgenda = class SqAgenda extends sequelize_typescript_1.Model {
};
exports.SqAgenda = SqAgenda;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAgenda.prototype, "agendaId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqPractitioner_1.SqPractitioner),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAgenda.prototype, "practitionerId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAgenda.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqAvailability_1.SqAvailability, {
        foreignKey: 'agendaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SqAgenda.prototype, "availabilities", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqPractitioner_1.SqPractitioner),
    __metadata("design:type", SqPractitioner_1.SqPractitioner)
], SqAgenda.prototype, "practitioner", void 0);
exports.SqAgenda = SqAgenda = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "agenda",
        timestamps: false,
    })
], SqAgenda);
exports.default = SqAgenda;
