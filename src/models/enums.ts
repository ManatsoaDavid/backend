
export enum EUserType {
  VISITEUR = "VISITEUR",
  PRATICIEN = "PRATICIEN",
}

export enum EGenderUser {
  HOMME = "HOMME",
  FEMME = "FEMME"
}

export enum EAvailabilityStatus {
  DISPONIBLE = "DISPONIBLE",
  NON_DISPONIBLE = "NON_DISPONIBLE",
}

export enum EAgendaCategory {
  JOURNALIER = "JOURNALIER",
  HEBDOMADAIRE = "HEBDOMADAIRE",
  MENSUEL = "MENSUEL",
}


export enum EAppointmentStatus {
  EN_ATTENTE = "EN ATTENTE",
  CONFIRME = "CONFIRME",
  ANNULE = "ANNULE",
  REPORTE = "REPORTE",
  TERMINE = "TERMINE",
}

export enum ESubscriptionType {
  TRIAL = "TRIAL",
  LITE = "LITE",
  PREMIUM = "PREMIUM",
  GOLD = "GOLD",
}

export enum ESubscriptionCycle {
  TRIAL = "TRIAL",
  MOIS = "MOIS",
  TRIMESTRE = "TRIMESTRE",
  SEMESTRE = "SEMESTRE",
  ANNUEL = "ANNUEL",
}

export enum EDurationUnit {
  days = 'days',
  months = 'months',
}
