import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { IReview } from "../models/review.model";
import { IUser } from "../models/user.model";
import SqUser from "./SqVisitor";
import { DataTypes } from "sequelize";

@Table({
  tableName: "reviews",
  timestamps: true,
})
export class SqReview extends Model<IReview> implements IReview {
  @PrimaryKey
  @AutoIncrement
  @Column
  reviewId!: number;

  @ForeignKey(() => SqUser)
  @Column
  userId!: number;

  @BelongsTo(() => SqUser, 'userId')
  users!: IUser;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  rating!: number;

  @Column(DataTypes.BIGINT)
  createdAt!: number;

  @Column(DataTypes.BIGINT)
  updatedAt!: number;

}
