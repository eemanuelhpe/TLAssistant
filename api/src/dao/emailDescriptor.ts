
export interface EmailDescriptor {
    email:string;
    alerts:Array<Alert>;

}

export interface Alert {
    fieldsToFill?: any;
    templateIdentifier:string;
}