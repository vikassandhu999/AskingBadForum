import {model, Schema, SchemaTypes} from "mongoose";

const {String, Boolean} = SchemaTypes;

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
    secret : {
        required : true,
        type : String
    }
});

customerSchema.index("customer_id");

const customerAuthSecretModel = model("customer_auth_secrets", customerSchema);


export {
    customerAuthSecretModel
}