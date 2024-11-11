"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PractitionerService = void 0;
const SqPractitioner_1 = require("../sequelize-model/SqPractitioner");
const SqUser_1 = __importDefault(require("../sequelize-model/SqUser"));
const error_1 = require("../util/error");
class PractitionerService {
    createPractitioner(practitionerData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!practitionerData.userId || !practitionerData.officeAddress) {
                throw new Error("Tous les champs obligatoires doivent être renseignés");
            }
            const practitioner = yield SqPractitioner_1.SqPractitioner.create({
                userId: practitionerData.userId,
                idCardImage: practitionerData.idCardImage,
                residenceCertificate: practitionerData.residenceCertificate,
                officeAddress: practitionerData.officeAddress,
                status: practitionerData.status || 'nouveau',
                category: practitionerData.category,
                specialty: practitionerData.specialty,
                diploma: practitionerData.diploma,
                nationalOrder: practitionerData.nationalOrder,
                registrationNumber: practitionerData.registrationNumber,
            });
            return practitioner.get({ plain: true });
        });
    }
    getPractitionerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const practitioner = yield SqPractitioner_1.SqPractitioner.findByPk(id, {
                include: [
                    { model: SqUser_1.default, as: 'user' },
                ],
            });
            if (!practitioner) {
                return null;
            }
            return practitioner.get({ plain: true });
        });
    }
    getAllPractitioners() {
        return __awaiter(this, void 0, void 0, function* () {
            const practitioners = yield SqPractitioner_1.SqPractitioner.findAll({
                include: [
                    { model: SqUser_1.default, as: 'user' },
                ],
            });
            return practitioners.map(practitioner => practitioner.get({ plain: true }));
        });
    }
    updatePractitioner(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const practitioner = yield SqPractitioner_1.SqPractitioner.findByPk(id, {
                include: [
                    { model: SqUser_1.default, as: 'user' }
                ],
            });
            if (!practitioner) {
                return null;
            }
            const { user } = updateData, practitionerData = __rest(updateData, ["user"]);
            yield practitioner.update(practitionerData);
            if (user) {
                yield practitioner.user.update(user);
            }
            yield practitioner.reload();
            return practitioner.get({ plain: true });
        });
    }
    deletePractitioner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const practitioner = yield SqPractitioner_1.SqPractitioner.findByPk(id);
            if (!practitioner) {
                return false;
            }
            yield practitioner.destroy();
            return true;
        });
    }
    countPractitioners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield SqPractitioner_1.SqPractitioner.count();
                return count;
            }
            catch (error) {
                throw new error_1.CustomError(500, "Error counting practitioners");
            }
        });
    }
}
exports.PractitionerService = PractitionerService;
