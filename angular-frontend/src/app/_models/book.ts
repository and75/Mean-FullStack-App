/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';

export interface Authors {
    id:string;
    fullname:string;
}
export interface Tags {
    id:string;
    label:string;
}
export interface DigitalSourceModel {
    label:string;
    url:string;
}
export class DigitalSource implements DigitalSourceModel {
    label:string;
    url:string;
    constructor(data?: DigitalSourceModel) {
        this.label = data?.label;
        this.url = data?.url;
    }
}
export interface EditionModel {
    century: string;
    year: string;
    location: string;
    bC : boolean;
}
export class Edition implements EditionModel {
    century: string;
    year: string;
    location: string;
    bC : boolean;
    constructor(data?: EditionModel) {
        this.century = data?.century;
        this.year = data?.year;
        this.location = data?.location;
        this.bC = data?.bC;
    }
}

export interface BookModel {
    _id: string;
    title: string;
    authors: Authors[];
    pages: string;
    lang: string,
    abstract: string;
    firstEdition: EditionModel;
    currentEdition: EditionModel;
    reference: string;
    digitalSource:DigitalSourceModel;
    notes: string;
    pdf: any;
    tags: Tags[];
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
    authors: Authors[];
    pages: string;
    lang: string;
    abstract: string;
    firstEdition: EditionModel;
    currentEdition: EditionModel;
    reference: string;
    digitalSource:DigitalSourceModel;
    notes: string;
    pdf: any;
    tags: Tags[];
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    protectedByC: boolean;
    accessId: number;

    constructor(data?: BookModel) {
        this._id = data?._id;
        this.title = data?.title;
        this.authors = data?.authors;
        this.pages = data?.pages;
        this.lang = data?.lang;
        this.abstract = data?.abstract;
        this.firstEdition = new Edition(data?.firstEdition);
        this.currentEdition = new Edition(data?.currentEdition);
        this.reference = data?.reference;
        this.digitalSource= new DigitalSource(data?.digitalSource);
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
