import sgMail from "@sendgrid/mail";
import {Email, IEmailService} from "../IEmailService";

const sendGridApiKey = process.env.SENDGRID_API_KEY as string;

export class SendGridEmailService implements IEmailService {

    constructor() {
        sgMail.setApiKey(sendGridApiKey);
    }

    async sendEmail(email: Email): Promise<void> {
        const sendGridEmail = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            html: email.body,
        }

        await sgMail.send(sendGridEmail);
    }
}