import { DataTypes, Optional } from "sequelize";
import {
  AutoIncrement,
  Column,
  DefaultScope,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from "sequelize-typescript";
import { EGenderUser, EUserType } from "../models/enums";
import { IUser } from "../models/user.model";
import { SqPractitioner } from './SqPractitioner';
import { SqVisitor } from "./SqVisitor";

interface IUserCreation extends Optional<IUser, "userId"> { }

@DefaultScope(() => ({
  attributes: {
    exclude: ["password"],
  },
}))
@Scopes(() => ({
  login: {
    attributes: ["userId", "email", "password", "userType"],
  },
}))
@Table({
  tableName: "users",
  createdAt: false,
  updatedAt: false,
})
export class SqUser extends Model<IUser, IUserCreation> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column
  userId!: number;

  @Column
  name!: string;

  @Column
  firstName!: string;

  @Column
  email!: string;

  @Column
  contact!: string;

  @Column(DataTypes.BIGINT)
  birthDate!: number;

  @Column
  gender!: EGenderUser;

  @Column
  userType!: EUserType;

  @Column
  avatar!: string;

  @Column
  password!: string;

  @Column(DataTypes.BIGINT)
  createdAt!: number;

  @Column(DataTypes.BIGINT)
  updatedAt!: number;

  @HasMany(() => SqVisitor, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: 'CASCADE',
  })
  visitor!: SqVisitor[];

  @HasMany(() => SqPractitioner, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: 'CASCADE',
  })
  practitioner!: SqPractitioner[];

  // Association with User
  user!: SqUser;
}
export default SqUser;
