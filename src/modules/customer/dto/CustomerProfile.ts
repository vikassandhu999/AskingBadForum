export interface CustomerAddressDTO {
    city: string;
    state: string;
    street: string;
    zip: string;
    country: string;
}

export interface CustomerDTO {
    customerId: string;
    email: string;
    firstName: string;
    lastName: string;
    address: CustomerAddressDTO
}