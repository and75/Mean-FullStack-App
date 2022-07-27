/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 
 export interface DataModel {
    data: any,
    error  : string;
    count  :number;
}
 export interface ApiRes {
    action: string,
    succes: boolean;
    mess:string;
    payload: DataModel;
}