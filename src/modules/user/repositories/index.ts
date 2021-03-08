import {MongooseUserRepository} from "./imples/MongooseUserRepository";
import { IUserRepository } from './IUserRepository';

const userRepository = new MongooseUserRepository();

export {
    userRepository
}