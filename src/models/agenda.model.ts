
export interface IAgenda {
    agendaId: number;
    category: string;
    practitionerId: number;
}

export class Agenda implements IAgenda {
    public agendaId!: number;
    public category!: string;
    public practitionerId!: number;
}

export interface IAgenda {
    agendaId: number;
    category: string;
    practitionerId: number;
}
