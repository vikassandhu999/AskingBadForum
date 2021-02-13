export interface ICustomerAddressProps {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export class CustomerAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;

    private constructor(props: ICustomerAddressProps) {
        this.city = props.city;
        this.state = props.state;
        this.zip = props.zip;
        this.street = props.street;
        this.country = props.country;
    }

    public static make(props: ICustomerAddressProps): CustomerAddress {
        return new CustomerAddress(props);
    }
}