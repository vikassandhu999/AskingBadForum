import {v4 as uuid} from "uuid";
import {JWT} from "../../src/shared/packages/jwt";
import {TokenExpiredError} from "jsonwebtoken";
import {Utils} from "../../src/shared/core/Utils";

const fakeSecret = "sdfjaklsdjfl;kasjdflasjkjdqeoirjfgiowjeiofji";

const payload = {
    userId : uuid()
}

describe("JWTPackage" , () => {
    it("createAndVerifyToken" , async ()=> {
        const token = JWT.createToken(payload,fakeSecret,2);
        try{
            let decoded = await JWT.verify(token , fakeSecret);
            expect(decoded.userId).toEqual(payload.userId);
            await Utils.sleep(2000); //2 seconds
            decoded = await JWT.verify(token , fakeSecret);
            expect(decoded).toEqual(null);
        } catch (e) {
            console.log(e);
            expect(e.name).toEqual(TokenExpiredError.name);
        }
    });
});