import {CustomerPassword} from "../../../src/modules/customer/domain/CustomerPassword";

const plainPassword = "instagram";
const mockPassword = CustomerPassword.make({password : plainPassword});
const hashedPassword = CustomerPassword.make({password : "$2b$10$kmoXgPZANrS.VMJ8TWTs1el1yCwnuLJ2rKqoxH2bVLHqcEI/unZDu" , hashed : true});

describe("CustomerPassword", () => {
    it("should compare plain password with CustomerPassword" , async ()=>{
        const firstResult= await mockPassword.compare(plainPassword);
        const secondResult= await mockPassword.compare(plainPassword + "h");
        const thirdResult = await hashedPassword.compare(plainPassword);
        expect(firstResult).toBe(true);
        expect(secondResult).toBe(false);
        expect(thirdResult).toBe(true);
    });

    it("should get hash from two different passwords and compare" , async ()=> {
        const firstHash = await mockPassword.hash();
        console.log(firstHash);
    });
});