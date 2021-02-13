import {customerRepo} from "../../../src/modules/customer/repository";

require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import {CreateCustomerUseCase} from "../../../src/modules/customer/usecase/CreateCustomer/usecase";
import {
    CreateCustomerResponse,
    EmailAlreadyExistError
} from "../../../src/modules/customer/usecase/CreateCustomer/response";

import {CustomerEmail} from "../../../src/modules/customer/domain/CustomerEmail";

//
// const fakeParams2 = {
//     email : "vikassandhu9090@gmail.com",
//     password : "instagram@123",
//     firstName : "Vikas",
//     lastName : "Sandhu",
//     street : "4th Avenue",
//     city : "Firozepur",
//     zip : "152002",
//     state : "Punjab",
//     country :"INDIA"
// }

const fakeParams = {
    email : "vikassandhu909@gmail.com",
    password : "instagram@123",
    firstName : "Vikas",
    lastName : "Sandhu",
    street : "4th Avenue",
    city : "Firozepur",
    zip : "152002",
    state : "Punjab",
    country :"INDIA"
}

describe('CreateCustomerUseCase', () => {
    let connection : any;
    let usecase : CreateCustomerUseCase;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
        usecase = new CreateCustomerUseCase(customerRepo);
    });

    afterAll(async ()=>{
        const fakedCustomer = await customerRepo.findOneByEmail(CustomerEmail.make(fakeParams.email));
        await customerRepo.deleteOne(fakedCustomer?.customerId as string);
        // const fakedCustomer2 = await customerRepo.findOneByEmail(CustomerEmail.make(fakeParams2.email));
        // await customerRepo.deleteOne(fakedCustomer?.customerId as string);
        // @ts-ignore
        await connection.close();
    });
    // //
    it("should create new customer successfully", async () => {
            const response = await usecase.run(fakeParams , {});
            expect(response).toEqual(new CreateCustomerResponse());
    });

    it('should throw error email already exist', async () => {
        try{
            const response = await usecase.run(fakeParams , {});
            fail("expected an error");
        } catch (e) {
            expect(e).toEqual(new EmailAlreadyExistError(fakeParams.email));
        }
    });
});