/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { UserModel } from './user';
import { Book } from './book';

export interface DateModel {
    century: string;
    bC: boolean;
    year: string;
    place: string;
}
export class DateAuthor implements DateModel {
    century: string;
    bC: boolean;
    year: string;
    place: string;
    constructor(data?: DateModel) {
        this.year = data?.year;
        this.century = data?.century;
        this.bC = data?.bC;
        this.place = data?.place;
    }
}
export interface AuthorModel {
    _id: string;
    fullname: string;
    biography: string;
    birthDate: DateAuthor;
    deathDate: DateAuthor;
    books: Book[];
    tags: any;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    accessId: number;
}
export class Author implements AuthorModel {

    _id: string;
    fullname: string;
    biography: string;
    birthDate: DateAuthor;
    deathDate: DateAuthor;
    books: Book[];
    tags: any;
    created: Date;
    updated: Date;
    owner: UserModel;
    enable: boolean;
    protectedByC: boolean;
    accessId: number;

    constructor(data?: AuthorModel) {
        this._id = data?._id;
        this.fullname = data?.fullname;
        this.biography = data?.biography;
        this.birthDate = new DateAuthor(data?.birthDate);
        this.deathDate = new DateAuthor(data?.deathDate);
        this.accessId = data?.accessId;
        this.owner = data?.owner;
        this.tags = data?.tags;
        this.created = data?.created;
        this.updated = data?.updated;
        this.enable = data?.enable;
    }

}
