export interface LanguageModel {
    de:string;
    el:string;
    en:string;
    fr:string;
    lt:string;
    it:string;
}

export class Language implements LanguageModel {

    de:string;
    el:string;
    en:string;
    fr:string;
    lt:string;
    it:string;

    constructor() {
        this.de = "German";
        this.el="Greek";
        this.en= "English";
        this.fr= "French";
        this.lt="Latin";
        this.it='Italian';
    }

}
