/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { UserModel } from './user';
 export interface ActivityModel {
    _id: string;
    action: string;
    object: any;
    objectModel:string;
    subject: UserModel;
    tags: string;
    created: Date;
    updated: Date;
    accesId: number;
 }
 
 export class Activity implements ActivityModel {
 
    _id: string;
    action: string;
    object: any;
    objectModel:string;
    subject: UserModel;
    tags: string;
    created: Date;
    updated: Date;
    accesId: number;

     constructor(data?: ActivityModel) {
         this._id = data?._id;
         this.action = data?.action;
         this.object = data?.object;
         this.objectModel = data?.objectModel;
         this.subject = data?.subject;
         this.created = data?.created;
         this.updated = data?.updated;
     }
 
 }