export class IError
{
    id:number;
    eventId:number;
    logLevel: number;
    message:string;
    createdTime:Date;
    userName?:string;
    path?:string;
}