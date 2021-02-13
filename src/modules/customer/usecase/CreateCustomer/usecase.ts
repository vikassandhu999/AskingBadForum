import {CreateCustomerDTO} from "./dto";
import {ICustomerRepo} from "../../repository/ICustomerRepo";
import {CustomerEmail} from "../../domain/CustomerEmail";
import {CustomerPassword} from "../../domain/CustomerPassword";
import {CustomerAddress} from "../../domain/CustomerAddress";
import Customer from "../../domain/Customer";
import {CreateCustomerResponse, EmailAlreadyExistError} from "./response";

export class CreateCustomerUseCase {
    private readonly customerRepo: ICustomerRepo;

    constructor(customerRepo: ICustomerRepo) {
        this.customerRepo = customerRepo;
    }

    public async run(params: CreateCustomerDTO, context: any): Promise<CreateCustomerResponse> {
        //todo : sanitize the params
        const email = CustomerEmail.make(params.email);
        const password = CustomerPassword.make({password: params.password});
        const address = CustomerAddress.make({
            street: params.street,
            zip: params.zip,
            city: params.zip,
            state: params.state,
            country: params.country
        });

        const customer = Customer.make({
            email,
            password,
            address,
            firstName: params.firstName,
            lastName: params.lastName,
            isEmailVerified: false
        });

        const emailAlreadyExist = await this.customerRepo.emailExist(email);

        if (emailAlreadyExist) {
            throw new EmailAlreadyExistError(email.value);
        }

        await this.customerRepo.save(customer);

        return new CreateCustomerResponse();
    }
}