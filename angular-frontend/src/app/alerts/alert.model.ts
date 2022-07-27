/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;
    spinner: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}