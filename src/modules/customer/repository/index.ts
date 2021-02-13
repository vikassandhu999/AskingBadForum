import {MongooseCustomerRepo} from "./imples/MongooseCustomerRepo";
import {customerModel} from "../../../shared/infra/db/mongoose/models/Customer";
import {MongooseAuthRepo} from "./imples/MongooseAuthRepo";
import {customerAuthSecretModel} from "../../../shared/infra/db/mongoose/models/CustomerAuthSecret";

const customerRepo = new MongooseCustomerRepo(customerModel);

const authRepo = new MongooseAuthRepo(customerAuthSecretModel);

export {
    customerRepo ,
    authRepo
}