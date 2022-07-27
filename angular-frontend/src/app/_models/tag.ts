/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';


export interface TagModel {
    _id: string;
    label: string;
    translations: string[];
    created: Date;
    updated: Date;
    owner: UserModel;
}

export class Tag implements TagModel {

    _id: string;
    label: string;
    translations: string[];
    created: Date;
    updated: Date;
    owner: UserModel;
    
    constructor(data?: TagModel) {
        this._id = data?._id;
        this.label = data?.label;
        this.translations = data?.translations;
        this.created = data?.created;
        this.updated = data?.updated;
        this.owner = data?.owner;
    }

}
