/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

export interface UserModel {
    _id: string,
    firstName: string,
    lastName: string,
    istitution:string,
    presentation:string,
    username: string,
    email: string,
    password: string,
    avathar: string,
    enable: boolean,
    role: string
}

export class User implements UserModel {

    public _id: string;
    public firstName: string;
    public lastName: string;
    public istitution:string;
    public presentation:string;
    public username: string;
    public email: string;
    public password: string;
    public avathar: string;
    public enable: boolean;
    public role: string

    constructor(data:UserModel) {
        this._id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.istitution = data.istitution;
        this.presentation = data.presentation;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.avathar = data.avathar;
        this.enable = data.enable;
        this.role = data.role
    }

}