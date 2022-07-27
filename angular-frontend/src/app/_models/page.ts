/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';


export interface PageModel {
    _id: string;
    title: string;
    content: string;
    bookId:string;
    tags: any;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    accessId: number;
}
export class Page implements PageModel {

    _id: string;
    title: string;
    content: string;
    tags: any;
    bookId:string;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    protectedByC: boolean;
    accessId: number;

    constructor(data?: PageModel) {
        this._id = data?._id;
        this.title = data?.title;
        this.content = data?.content;
        this.owner = data?.owner;
        this.tags = data?.tags;
        this.bookId = data?.bookId;
        this.created = data?.created;
        this.updated = data?.updated;
        this.enable = data?.enable;
        this.accessId = data?.accessId;
    }
}
