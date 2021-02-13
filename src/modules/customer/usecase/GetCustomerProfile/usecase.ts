import {ICustomerRepo} from "../../repository/ICustomerRepo";
import {Context} from "../../../../shared/core/IContext";
import {GetCustomerProfileResponse, UserProfileDoesNotExistError} from "./response";
import {ICustomerClaims} from "../../dto/ICustomerClaims";
import {CustomerMapper} from "../../mapper/CustomerMapper";
import {CustomerDTO} from "../../dto/CustomerProfile";
import {AssertContext} from "../../../../shared/core/AssertContext";

export class GetCustomerProfileUseCase {
    private readonly customerRepo: ICustomerRepo;

    constructor(customerRepo: ICustomerRepo) {
        this.customerRepo = customerRepo;
    }

    public async run(params: {}, context: Context<ICustomerClaims>): Promise<GetCustomerProfileResponse> {

        AssertContext<ICustomerClaims>(context, {isAuthenticated: true, hasClaims: true});

        const customerId = (context.claims as ICustomerClaims).customerId;

        const customer = await this.customerRepo.findOne(customerId);

        if (!customer) {
            throw new UserProfileDoesNotExistError();
        }

        const customerProfile: CustomerDTO = CustomerMapper.toDTO(customer);
        return new GetCustomerProfileResponse(customerProfile);
    }
}