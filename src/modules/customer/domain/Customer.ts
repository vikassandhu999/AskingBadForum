import {v4 as uuid} from "uuid";
import {CustomerEmail} from "./CustomerEmail";
import {CustomerPassword} from "./CustomerPassword";
import {CustomerAddress} from "./CustomerAddress";

export interface ICustomerProps {
    email: CustomerEmail;
    password: CustomerPassword;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    address?: CustomerAddress;
}

export default class Customer {
    customerId: string;
    email: CustomerEmail;
    password: CustomerPassword;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    address?: CustomerAddress;

    private constructor(props: ICustomerProps, id: string) {
        this.customerId = id;
        this.email = props.email;
        this.password = props.password;
        this.address = props.address;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.isEmailVerified = props.isEmailVerified;
    }

    public static make(props: ICustomerProps, id?: string): Customer {
        const customerId = id ?? uuid();
        return new Customer(props, customerId);
    }

}