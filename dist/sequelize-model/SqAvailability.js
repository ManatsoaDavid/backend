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
exports.SqAvailability = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const SqAgenda_1 = require("./SqAgenda");
let SqAvailability = class SqAvailability extends sequelize_typescript_1.Model {
};
exports.SqAvailability = SqAvailability;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAvailability.prototype, "availabilityId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqAgenda_1.SqAgenda),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqAvailability.prototype, "agendaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqAgenda_1.SqAgenda),
    __metadata("design:type", SqAgenda_1.SqAgenda)
], SqAvailability.prototype, "agenda", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqAvailability.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAvailability.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAvailability.prototype, "startTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqAvailability.prototype, "endTime", void 0);
exports.SqAvailability = SqAvailability = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "availabilities",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    })
], SqAvailability);
exports.default = SqAvailability;
