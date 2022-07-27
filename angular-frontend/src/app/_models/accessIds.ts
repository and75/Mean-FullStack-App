export interface AccessIdsModel {
    private:number;
    logged:number;
    public:number;
}

export class AccessIds implements AccessIdsModel {

    public:number;
    private:number;
    logged:number;

    constructor() {
        this.private=1;
        this.logged=2;
        this.public=3;
    }

}
