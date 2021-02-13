import {Model} from "mongoose";
import {IAuthRepo} from "../IAuthRepo";
import {CustomerAuthSecret} from "../../domain/CustomerAuthSecret";

export class MongooseAuthRepo implements IAuthRepo {
    private readonly model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    deleteOne(customerId: string): Promise<void> {
        throw new Error("unimplemented");
    }

    getByCustomerEmail(email: string): Promise<CustomerAuthSecret> {
        throw new Error("unimplemented");
    }

    getById(customerId: string): Promise<CustomerAuthSecret> {
        throw new Error("unimplemented");
    }

    saveOne(doc: CustomerAuthSecret): Promise<void> {
        throw new Error("unimplemented");
    }
}