import { EGenderUser, EUserType } from "./enums";


export interface IUser {
  userId?: number;
  name: string;
  firstName: string;
  email: string;
  contact: string;
  birthDate: number;
  gender: EGenderUser;
  userType: EUserType;
  avatar: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
}

export class User implements IUser {
  public userId!: number;
  public name!: string;
  public firstName!: string;
  public email!: string;
  public contact!: string;
  public birthDate!: number;
  public gender!: EGenderUser;
  public userType!: EUserType;
  public avatar!: string;
  public password!: string;
  public createdAt?: number;
  public updatedAt?: number;
}
