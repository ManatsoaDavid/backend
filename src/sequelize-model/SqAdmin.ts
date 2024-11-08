import { Optional } from "sequelize";
import { AutoIncrement, Column, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { IAdmin } from "../models/admin.model";

interface IAdminCreation extends Optional<IAdmin, 'adminId'> { }

@Scopes(() => ({
    login: {
        attributes: ['adminId', 'username', 'email', 'password']
    },
}))
@Table({
    tableName: 'admin',
    timestamps: false
})
export class SqAdmin extends Model<IAdmin, IAdminCreation> implements IAdmin {

    @PrimaryKey
    @AutoIncrement
    @Column
    adminId!: number;

    @Column
    username!: string;

    @Column
    email!: string;

    @Column
    password!: string;
}
