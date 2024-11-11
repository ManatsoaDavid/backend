"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDurationUnit = exports.ESubscriptionCycle = exports.ESubscriptionType = exports.EAppointmentStatus = exports.EAgendaCategory = exports.EAvailabilityStatus = exports.EGenderUser = exports.EUserType = void 0;
var EUserType;
(function (EUserType) {
    EUserType["VISITEUR"] = "VISITEUR";
    EUserType["PRATICIEN"] = "PRATICIEN";
})(EUserType || (exports.EUserType = EUserType = {}));
var EGenderUser;
(function (EGenderUser) {
    EGenderUser["HOMME"] = "HOMME";
    EGenderUser["FEMME"] = "FEMME";
})(EGenderUser || (exports.EGenderUser = EGenderUser = {}));
var EAvailabilityStatus;
(function (EAvailabilityStatus) {
    EAvailabilityStatus["DISPONIBLE"] = "DISPONIBLE";
    EAvailabilityStatus["NON_DISPONIBLE"] = "NON_DISPONIBLE";
})(EAvailabilityStatus || (exports.EAvailabilityStatus = EAvailabilityStatus = {}));
var EAgendaCategory;
(function (EAgendaCategory) {
    EAgendaCategory["JOURNALIER"] = "JOURNALIER";
    EAgendaCategory["HEBDOMADAIRE"] = "HEBDOMADAIRE";
    EAgendaCategory["MENSUEL"] = "MENSUEL";
})(EAgendaCategory || (exports.EAgendaCategory = EAgendaCategory = {}));
var EAppointmentStatus;
(function (EAppointmentStatus) {
    EAppointmentStatus["EN_ATTENTE"] = "EN ATTENTE";
    EAppointmentStatus["CONFIRME"] = "CONFIRME";
    EAppointmentStatus["ANNULE"] = "ANNULE";
    EAppointmentStatus["REPORTE"] = "REPORTE";
    EAppointmentStatus["TERMINE"] = "TERMINE";
})(EAppointmentStatus || (exports.EAppointmentStatus = EAppointmentStatus = {}));
var ESubscriptionType;
(function (ESubscriptionType) {
    ESubscriptionType["TRIAL"] = "TRIAL";
    ESubscriptionType["LITE"] = "LITE";
    ESubscriptionType["PREMIUM"] = "PREMIUM";
    ESubscriptionType["GOLD"] = "GOLD";
})(ESubscriptionType || (exports.ESubscriptionType = ESubscriptionType = {}));
var ESubscriptionCycle;
(function (ESubscriptionCycle) {
    ESubscriptionCycle["TRIAL"] = "TRIAL";
    ESubscriptionCycle["MOIS"] = "MOIS";
    ESubscriptionCycle["TRIMESTRE"] = "TRIMESTRE";
    ESubscriptionCycle["SEMESTRE"] = "SEMESTRE";
    ESubscriptionCycle["ANNUEL"] = "ANNUEL";
})(ESubscriptionCycle || (exports.ESubscriptionCycle = ESubscriptionCycle = {}));
var EDurationUnit;
(function (EDurationUnit) {
    EDurationUnit["days"] = "days";
    EDurationUnit["months"] = "months";
})(EDurationUnit || (exports.EDurationUnit = EDurationUnit = {}));
