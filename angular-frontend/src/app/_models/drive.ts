/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import {UserModel} from'./user';

 export interface DriveModel {
     _id: string;
     title: string;
     description:string;
     mimetype:string;
     size:number;
     path:string;
     relPath:string;
     created: Date;
     updated: Date;
     owner: UserModel;
     enable: boolean;
     accessId:number;
 }
 export class Drive implements DriveModel {
 
     _id: string;
     title: string;
     description:string;
     mimetype:string;
     size:number;
     path:string;
     relPath:string;
     created: Date;
     updated: Date;
     owner: UserModel;
     enable: boolean;
     accessId:number;
 
     constructor(data?:DriveModel) {
         this._id = data._id;
         this.title = data?.title;
         this.description = data?.description;
         this.mimetype = data?.mimetype;
         this.size = data?.size;
         this.path = data?.path;
         this.relPath = data?.relPath;
         this.accessId = data.accessId;
         this.owner = data.owner;
         this.created = data.created;
         this.updated = data.updated;
         this.enable = data.enable;
     }
 }
 