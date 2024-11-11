"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorService = void 0;
const SqVisitor_1 = __importStar(require("../sequelize-model/SqVisitor"));
const error_1 = require("../util/error");
class VisitorService {
    createVisitor(visitorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitor = yield SqVisitor_1.SqVisitor.create({
                userId: visitorData.userId,
                address: visitorData.address,
            });
            return visitor.get({ plain: true });
        });
    }
    getAllVisitors() {
        return __awaiter(this, void 0, void 0, function* () {
            const visitors = yield SqVisitor_1.SqVisitor.findAll({
                include: [
                    { model: SqVisitor_1.default, as: 'user' },
                ],
            });
            return visitors.map(visitor => visitor.get({ plain: true }));
        });
    }
    getVisitorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitor = yield SqVisitor_1.SqVisitor.findByPk(id, {
                include: [
                    { model: SqVisitor_1.default, as: 'user' },
                ],
            });
            return visitor ? visitor.get({ plain: true }) : null;
        });
    }
    updateVisitor(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitor = yield SqVisitor_1.SqVisitor.findByPk(id, {
                include: [{ model: SqVisitor_1.default, as: 'user' }],
            });
            if (!visitor) {
                return null;
            }
            const { user } = updateData, visitorData = __rest(updateData, ["user"]);
            yield visitor.update(visitorData);
            if (user) {
                yield visitor.user.update(user);
            }
            yield visitor.reload();
            return visitor.get({ plain: true });
        });
    }
    deleteVisitor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitor = yield SqVisitor_1.SqVisitor.findByPk(id);
            if (!visitor) {
                return false;
            }
            yield visitor.destroy();
            return true;
        });
    }
    countVisitor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield SqVisitor_1.SqVisitor.count();
                return count;
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Erreur lors de la récupération du nombre de visiteurs');
            }
        });
    }
}
exports.VisitorService = VisitorService;
