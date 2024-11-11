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
exports.SqUser = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const enums_1 = require("../models/enums");
const SqPractitioner_1 = require("./SqPractitioner");
const SqVisitor_1 = require("./SqVisitor");
let SqUser = class SqUser extends sequelize_typescript_1.Model {
};
exports.SqUser = SqUser;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqUser.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "firstName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "contact", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqUser.prototype, "birthDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "gender", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "userType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "avatar", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqUser.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqUser.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqUser.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqVisitor_1.SqVisitor, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SqUser.prototype, "visitor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SqPractitioner_1.SqPractitioner, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SqUser.prototype, "practitioner", void 0);
exports.SqUser = SqUser = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: {
            exclude: ["password"],
        },
    })),
    (0, sequelize_typescript_1.Scopes)(() => ({
        login: {
            attributes: ["userId", "email", "password", "userType"],
        },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        createdAt: false,
        updatedAt: false,
    })
], SqUser);
exports.default = SqUser;
