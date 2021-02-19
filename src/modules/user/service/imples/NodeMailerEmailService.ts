import nodemailer, {Transporter} from "nodemailer";
import {Email, IEmailService} from "../IEmailService";
import emailConfig from "../../../../config/emailConfig";

export class NodeMailerEmailService implements IEmailService {
    private readonly transporter : Transporter;
    constructor(custom ?: {user : string , pass : string}) {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: custom??{
                user: emailConfig.nodemailerUserEmail, // generated ethereal user
                pass: emailConfig.nodemailerUserPassword, // generated ethereal password
            },
        });
    }

    async sendEmail(email: Email): Promise<void> {
        const formattedEmail = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            html: email.body,
        }

        await this.transporter.sendMail(formattedEmail);
    }
}