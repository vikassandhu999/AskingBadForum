import {ICustomerRepo} from "../../repository/ICustomerRepo";
import {CreateCustomerDTO} from "../CreateCustomer/dto";
import {CustomerEmail} from "../../domain/CustomerEmail";
import {CustomerPassword} from "../../domain/CustomerPassword";
import {EmailNotVerifiedError, EmailOrPasswordDoesNotMatchError, LoginCustomerResponse} from "./response";
import {AuthService, IAuthTokens} from "../../service/authService";
import {Context} from "../../../../shared/core/IContext";
import {ICustomerClaims} from "../../dto/ICustomerClaims";

export class LoginCustomerUseCase {
    private readonly customerRepo: ICustomerRepo;
    private readonly authService: AuthService;

    constructor(customerRepo: ICustomerRepo, authService: AuthService) {
        this.customerRepo = customerRepo;
        this.authService = authService;
    }

    public async run(params: CreateCustomerDTO, context: Context<ICustomerClaims>): Promise<LoginCustomerResponse> {
        const email = CustomerEmail.make(params.email);
        const password = CustomerPassword.make({password: params.password});

        const customer = await this.customerRepo.findOneByEmail(email);

        if (!customer) {
            throw new EmailOrPasswordDoesNotMatchError(email.value, password.value);
        }

        if (!customer.isEmailVerified) {
            throw new EmailNotVerifiedError(email.value);
        }

        const isPasswordMatched = await customer.password.compare(password.value);

        if (isPasswordMatched) {
            throw new EmailOrPasswordDoesNotMatchError(email.value, password.value);
        }

        let authTokens: IAuthTokens;

        try {
            authTokens = await this.authService.generateAuthTokens(customer.customerId , {
               email : customer.email.value,
               customerId : customer.customerId
            });
        } catch (e) {
            throw new Error("AppError");
        }

        return new LoginCustomerResponse(authTokens);
    }
}