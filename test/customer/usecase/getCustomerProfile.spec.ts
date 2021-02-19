import {customerRepo} from "../../../src/modules/customer/repository";

require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";

import {CustomerEmail} from "../../../src/modules/customer/domain/CustomerEmail";
import {GetCustomerProfileUseCase} from "../../../src/modules/customer/usecase/GetCustomerProfile/usecase";
import Customer from "../../../src/modules/customer/domain/Customer";
import {CustomerPassword} from "../../../src/modules/customer/domain/CustomerPassword";
import {CustomerAddress} from "../../../src/modules/customer/domain/CustomerAddress";
import {CustomerMapper} from "../../../src/modules/customer/mapper/CustomerMapper";
import {UnauthorizedAccessError} from "../../../src/shared/core/UnathorizedAccessError";
import {NotEnoughInformationProvidedError} from "../../../src/shared/core/NotEnoughInformationProvidedError";

const customerId = "fake_user_1";

const fakeCustomer = Customer.make({
    firstName: "Vikas",
    isEmailVerified: false,
    lastName: "Sandhu",
    password: CustomerPassword.make({password: "Instagram"}),
    email: CustomerEmail.make("vikassandhu9990@gmail.com"),
    address: CustomerAddress.make({street: "1 Avenue", city: "sjsa", country: "USA", state: "alabama", zip: "asfkjsd"})
}, customerId);

describe('GetCustomerProfileUseCase', () => {
    let connection: any;
    let usecase: GetCustomerProfileUseCase;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
        usecase = new GetCustomerProfileUseCase(customerRepo);
        await customerRepo.save(fakeCustomer);
    });

    afterAll(async () => {
        await customerRepo.deleteOne(customerId);
        // @ts-ignore
        await connection.close();
    });
    // //
    it("should get use profile successfully", async () => {
        const response = await usecase.run({},
            {
                authLevel: 0,
                claims: {customerId: fakeCustomer.customerId, email: fakeCustomer.email.value},
                isAuthenticated: true
            });
        expect(response.data).toEqual((CustomerMapper.toDTO(fakeCustomer)));
        await customerRepo.deleteOne(customerId);
    });

    it("should throw UnauthorizedAccessError", async () => {
        try {
            const response = await usecase.run({},
                {
                    authLevel: 0,
                    claims: {customerId: fakeCustomer.customerId, email: fakeCustomer.email.value},
                    isAuthenticated: false
                });
            fail("Expected to throw an error");
            await customerRepo.deleteOne(customerId);
        } catch (e) {
            expect(e).toEqual(new UnauthorizedAccessError());
        }
    });


    it("should throw NotEnoughInformationProviedError", async () => {
        try {
            const response = await usecase.run({},
                {
                    authLevel: 0,
                    isAuthenticated: true
                });
            fail("Expected to throw an error");
            await customerRepo.deleteOne(customerId);
        } catch (e) {
            expect(e).toEqual(new NotEnoughInformationProvidedError());
        }
    });

});