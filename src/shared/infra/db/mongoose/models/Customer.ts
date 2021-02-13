import {model, Schema, SchemaTypes} from "mongoose";

const {String, Boolean} = SchemaTypes;

const customerAddressSchema = new Schema({
    street: String,
    city: String,
    zip: String,
    state: String,
    country: String,
});

const customerSchema = new Schema({
    customer_id: {
        unique: true,
        required: true,
        type: String,
    },
    email: {
        unique: true,
        required: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    address: {
        type: customerAddressSchema,
        required: false,
    }
});

customerSchema.index("customer_id");
customerSchema.index("email");
customerSchema.index("address.state");

const customerModel = model("customer", customerSchema);


export {
    customerModel
}