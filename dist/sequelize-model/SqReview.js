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
exports.SqReview = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const SqVisitor_1 = __importDefault(require("./SqVisitor"));
const sequelize_1 = require("sequelize");
let SqReview = class SqReview extends sequelize_typescript_1.Model {
};
exports.SqReview = SqReview;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqReview.prototype, "reviewId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SqVisitor_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqReview.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => SqVisitor_1.default, 'userId'),
    __metadata("design:type", Object)
], SqReview.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqReview.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SqReview.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SqReview.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqReview.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_1.DataTypes.BIGINT),
    __metadata("design:type", Number)
], SqReview.prototype, "updatedAt", void 0);
exports.SqReview = SqReview = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "reviews",
        timestamps: true,
    })
], SqReview);
