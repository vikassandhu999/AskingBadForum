require("dotenv").config();
import {Email} from "../../../src/user/service/IEmailService";
import {emailService} from "../../../src/user/service";

const fakeEmail : Email = {
    to : "kaizen.tech404@gmail.com",
    from :  "vikassandhu999@gmail.com",
    subject : "This is mock email for testing",
    body : "This is good body for mock email to send somewhere"
}

describe("SendGridEmailService" , () => {
    it("should resolve promise" , async ()=> {
        try{
            await emailService.sendEmail(fakeEmail);
        } catch (e) {
            console.log(e);
            fail("Rejected Promise");
        }
    });
});