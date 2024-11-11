
import { IUser, User } from "./user.model";
export interface IPractitioner extends IUser {
  practitionerId?: number;
  idCardImage: string;  // piece CIN
  residenceCertificate: string;
  officeAddress: string;
  status: string;
  category: string;
  specialty: string;
  diploma: string;
  nationalOrder: string; //ONM
  registrationNumber: string;
}

export class Practitioner extends User implements IPractitioner {
  public practitionerId!: number;
  public idCardImage!: string;
  public residenceCertificate!: string;
  public officeAddress!: string;
  public status!: string;
  public category!: string;
  public specialty!: string;
  public diploma!: string;
  public nationalOrder!: string;
  public registrationNumber!: string;
  public createdAt?: number;
  public updatedAt?: number;
}
