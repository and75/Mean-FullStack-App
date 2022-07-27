/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { UserModel } from './user';


 export interface VocabularyModel {
     _id: string;
     el: string
     de:string;
     en:string;
     fr:string;
     la:string;
     it:string;
     created: Date;
     updated: Date;
     owner: UserModel;
 }
 
 export class Vocabulary implements VocabularyModel {
 
     _id: string;
     el: string
     de:string;
     en:string;
     fr:string;
     la:string;
     it:string;
     created: Date;
     updated: Date;
     owner: UserModel;
     
     constructor(data?: VocabularyModel) {
         this._id = data?._id;
         this.el = data?.el;
         this.de = data?.de;
         this.en = data?.en;
         this.fr = data?.fr;
         this.la = data?.la;
         this.it = data?.it;
         this.created = data?.created;
         this.updated = data?.updated;
         this.owner = data?.owner;
     }
 
 }
 