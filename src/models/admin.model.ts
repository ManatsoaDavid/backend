export interface IAdmin {
    adminId?: number;
    username: string;
    email: string;
    password: string;
}


export default class Admin implements IAdmin {
    public adminId!: number;
    public email!: string;
    public password!: string;
    public username!: string;
}
