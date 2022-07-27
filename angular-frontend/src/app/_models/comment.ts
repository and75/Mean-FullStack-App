/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { UserModel } from './user';


 export interface CommentModel {
    _id: string;
    text: string;
    relObject: string;
    relType:string;
    created: Date;
    updated: Date;
    owner: UserModel;
 }
 
 export class Comment implements CommentModel {
 
     _id: string;
     text: string;
     relObject: string;
     relType:string;
     created: Date;
     updated: Date;
     owner: UserModel;

     constructor(data?: CommentModel) {
         this._id = data?._id;
         this.text = data?.text;
         this.relObject = data?.relObject;
         this.relType = data?.relType;
         this.created = data?.created;
         this.updated = data?.updated;
         this.owner = data?.owner;
     }
 
 }