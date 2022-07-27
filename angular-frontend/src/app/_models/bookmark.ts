/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';

export interface EditionModel {
    century: string;
    year: string;
    location: string
}

export interface BookmarkModel {
    _id: string;
    label: string;
    description: string;
    url: string;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    accessId: number;
}

export class Bookmark implements BookmarkModel {

    _id: string;
    label: string;
    description: string;
    url: string;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    accessId: number;

    constructor(data?: BookmarkModel) {
        this._id = data?._id;
        this.label = data?.label;
        this.description = data?.description;
        this.url = data?.url;
        this.created = data?.created;
        this.updated = data?.updated;
        this.owner = data?.owner;
        this.enable = data?.enable;
        this.accessId = data?.accessId;
    }

}
