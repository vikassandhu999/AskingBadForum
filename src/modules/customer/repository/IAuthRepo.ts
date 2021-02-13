import {ICustomerClaims} from "../dto/ICustomerClaims";
import {CustomerAuthSecret} from "../domain/CustomerAuthSecret";

export interface IAuthRepo {

    getById(customerId: string): Promise<CustomerAuthSecret>

    getByCustomerEmail(email: string) : Promise<CustomerAuthSecret>

    saveOne(doc : CustomerAuthSecret): Promise<void>

    deleteOne(customerId: string): Promise<void>

}