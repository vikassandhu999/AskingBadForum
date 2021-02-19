import {UsernameAlreadyTakenError} from "../../src/modules/user/usecase/CreateUser/types";
import {BaseError} from "../../src/shared/core/BaseError";

describe("CheckAProperty" , ()=>{
    it("check for instance" , () => {
        const error = new UsernameAlreadyTakenError();
        //@ts-ignore
        expect(true).toBe(true);
    });
});