import {customerRepo} from "../../../src/modules/customer/repository";
require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import Customer from "../../../src/modules/customer/domain/Customer";
import {CustomerEmail} from "../../../src/modules/customer/domain/CustomerEmail";
import {CustomerPassword} from "../../../src/modules/customer/domain/CustomerPassword";
import {CustomerAddress} from "../../../src/modules/customer/domain/CustomerAddress";
import {CustomerMapper} from "../../../src/modules/customer/mapper/CustomerMapper";

const customerId = "fake_user_1";

const fakeCustomer = Customer.make({
    firstName: "Vikas",
    isEmailVerified: false,
    lastName: "Sandhu",
    password: CustomerPassword.make({password: "Instagram"}),
    email: CustomerEmail.make("vikassandhu9990@gmail.com"),
    address : CustomerAddress.make({street : "1 Avenue" , city : "sjsa" , country : "USA" , state:"alabama" , zip : "asfkjsd"})
}, customerId);

describe("customerMapper" , ()=> {
    it('should print the persistence data', async function () {
        const data = await CustomerMapper.toPersistence(fakeCustomer);
        const domain = CustomerMapper.toDomain(data);
        const dataPassword = domain.password;
        domain.password=fakeCustomer.password;
        expect(domain).toEqual(fakeCustomer);
        const compareResult = await dataPassword.compare(fakeCustomer.password.value);
        expect(compareResult).toBe(true);
    });
});

describe('customerRepo', () => {
    let connection : any;
    let db;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
    });

    afterAll(async ()=>{
        // @ts-ignore
        await connection.close();
    })

    it("should insert one", async () => {
        await customerRepo.save(fakeCustomer);
    });

    it('should find a customer by id', async () => {
        const customer = await customerRepo.findOne(customerId);
        expect(customer).not.toBe(null);
        if(customer!=null) {
            const password = customer.password;
            customer.password = fakeCustomer.password;
            const passwordResult = await password.compare(fakeCustomer.password.value);
            expect(passwordResult).toBe(true);
        }
        expect(customer).toEqual(fakeCustomer);
    });

    it('should delete the customer by id', async function () {
       await customerRepo.deleteOne(customerId);
       const deletedCustomer = await customerRepo.findOne(customerId);
       expect(deletedCustomer).toBe(null);
    });

});