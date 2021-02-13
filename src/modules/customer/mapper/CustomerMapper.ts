import Customer from "../domain/Customer";
import {CustomerEmail} from "../domain/CustomerEmail";
import {CustomerPassword} from "../domain/CustomerPassword";
import {CustomerAddressMapper} from "./CustomerAddressMapper";
import {CustomerAddressDTO, CustomerDTO} from "../dto/CustomerProfile";

export class CustomerMapper {
    public static toDomain(raw: any): Customer {
        const email = CustomerEmail.make(raw.email);
        const password = CustomerPassword.make({password: raw.password, hashed: true});
        const address = CustomerAddressMapper.toDomain(raw.address);
        return Customer.make({
            email: email,
            password: password,
            address: address,
            firstName: raw.first_name,
            lastName: raw.last_name,
            isEmailVerified: raw.is_email_verified,
        }, raw.customer_id);
    }

    public static toDTO(customer: Customer): CustomerDTO {
        const customerAddress = customer.address ? CustomerAddressMapper.toDTO(customer.address) : {};
        return {
            customerId: customer.customerId,
            email: customer.email.value,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customerAddress as CustomerAddressDTO
        }
    }

    public static async toPersistence(customer: Customer): Promise<any> {
        const hashedPassword = await customer.password.hash();
        return {
            customer_id: customer.customerId,
            email: customer.email.value,
            password: hashedPassword,
            first_name: customer.firstName,
            last_name: customer.lastName,
            is_email_verified: customer.isEmailVerified,
            address: CustomerAddressMapper.toPersistence(customer.address)
        }
    }
}