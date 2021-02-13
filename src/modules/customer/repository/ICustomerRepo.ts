import Customer from "../domain/Customer";
import {CustomerEmail} from "../domain/CustomerEmail";

export interface ICustomerRepo {
    save(customer: Customer): Promise<void>

    emailExist(email: CustomerEmail): Promise<boolean>

    findOne(customerId: string): Promise<Customer | null>

    deleteOne(customerId: string): Promise<void>

    findOneByEmail(email: CustomerEmail): Promise<Customer | null>
}