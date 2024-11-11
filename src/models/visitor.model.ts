import { EUserType } from "./enums";
import { IUser, User } from "./user.model";

export interface IVisitor extends IUser {
  visitorId?: number;
  address: string;
}


export class Visitor extends User implements IVisitor {
  public name!: string;
  public firstName!: string;
  public email!: string;
  public contact!: string;
  public birthDate!: number;
  public userType!: EUserType;
  public avatar!: string;
  public password!: string;
  public createdAt?: number;
  public updatedAt?: number;

  public visitorId?: number;
  public address!: string;
}
