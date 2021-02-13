import {ICustomerRepo} from "../ICustomerRepo";
import Customer from "../../domain/Customer";
import {CustomerEmail} from "../../domain/CustomerEmail";
import {Model} from "mongoose";
import {CustomerMapper} from "../../mapper/CustomerMapper";

export class MongooseCustomerRepo implements ICustomerRepo {
    private readonly model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async findOne(customerId: string): Promise<Customer | null> {
        const found = await this.model.findOne({customer_id: customerId}).exec();
        if (!found) return null;
        return CustomerMapper.toDomain(found);
    }

    async deleteOne(customerId: string): Promise<void> {
        return this.model.deleteOne({customer_id: customerId}).exec();
    }

    async save(customer: Customer): Promise<void> {
        const dbCustomer = await CustomerMapper.toPersistence(customer);
        const newCustomer = new this.model(dbCustomer);
        await newCustomer.save();
    }

    emailExist(email: CustomerEmail): Promise<boolean> {
        return this.model.exists({email: email.value});
    }

    async findOneByEmail(email: CustomerEmail): Promise<Customer | null> {
        const found = await this.model.findOne({email: email.value}).exec();
        if (!found) return null;
        return CustomerMapper.toDomain(found);
    }

}