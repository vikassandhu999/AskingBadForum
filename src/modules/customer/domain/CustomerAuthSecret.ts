export interface ICustomerAuthSecretProps {
    customerId : string;
    email : string;
    secret : string;
}


export class CustomerAuthSecret {
    customerId : string;
    email : string;
    secret : string;
    private constructor( props : ICustomerAuthSecretProps ) {
        this.customerId = props.customerId;
        this.email = props.email;
        this.secret = props.secret;
    }

    public static make(props : ICustomerAuthSecretProps) : CustomerAuthSecret{
        return new CustomerAuthSecret((props));
    }
}