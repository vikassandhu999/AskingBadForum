export type Email = {
    to : string;
    from : string;
    subject : string;
    body : string;
}

export interface IEmailService {
    sendEmail(email : Email) : Promise<void>;
}