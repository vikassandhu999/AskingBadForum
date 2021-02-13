import {CustomerAddress} from "../domain/CustomerAddress";

export class CustomerAddressMapper {
    public static toDomain(raw: any): CustomerAddress {
        return CustomerAddress.make({
            street: raw.street,
            state: raw.state,
            city: raw.city,
            zip: raw.zip,
            country: raw.country
        });
    }

    public static toDTO(address: CustomerAddress): CustomerAddress {
        return {
            street: address.street,
            state: address.state,
            city: address.city,
            zip: address.zip,
            country: address.country
        }
    }


    public static toPersistence(address: CustomerAddress | undefined): any {
        if (!address)
            return {};
        else
            return {
                street: address.street,
                state: address.state,
                city: address.city,
                zip: address.zip,
                country: address.country
            }
    }
}