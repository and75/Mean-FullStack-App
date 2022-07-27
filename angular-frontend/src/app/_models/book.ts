/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';

export interface EditionModel {
    century: string;
    year: string;
    location: string;
    bC : boolean;
}
export interface BookModel {
    _id: string;
    title: string;
    author: string;
    pages: string;
    lang: string,
    abstract: string;
    firstEdition: EditionModel;
    currentEdition: EditionModel;
    reference: string;
    source: string;
    notes: string;
    pdf: any;
    tags: any;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    protectedByC: boolean;
    accessId: number;
}
export class Book implements BookModel {

    _id: string;
    title: string;
    author: string;
    pages: string;
    lang: string;
    abstract: string;
    firstEdition: EditionModel;
    currentEdition: EditionModel;
    reference: string;
    source: string;
    notes: string;
    pdf: any;
    tags: any;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    protectedByC: boolean;
    accessId: number;

    constructor(data?: BookModel) {
        this._id = data?._id;
        this.title = data?.title;
        this.author = data?.author;
        this.pages = data?.pages;
        this.abstract = data?.abstract;
        this.firstEdition = data?.firstEdition;
        this.currentEdition = data?.currentEdition;
        this.reference = data?.reference;
        this.source = data?.source;
        this.notes = data?.notes;
        this.pdf = data?.pdf;
        this.accessId = data?.accessId;
        this.protectedByC = data?.protectedByC;
        this.owner = data?.owner;
        this.tags = data?.tags;
        this.created = data?.created;
        this.updated = data?.updated;
        this.enable = data?.enable;

    }
}
