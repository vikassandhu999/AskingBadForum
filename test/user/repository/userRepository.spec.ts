import {v4 as uuid} from "uuid";
require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import {User} from "../../../src/modules/user/domain/User";
import {userRepository} from "../../../src/modules/user/repositories";

const userId = uuid();

const fakeUser = new User({
    userId ,
    email : "vikassandhu9909@gmail.com",
    fullName : "Vikas Sandhu",
    userName : "kaizen4040",
    password : "hello@123",
});

const fakeAuthSecret = uuid();

describe('userRepo', () => {
    let connection : any;
    let db;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
    });

    afterAll(async ()=>{
        // @ts-ignore
        await connection.close();
    })

    it("save", async () => {
        await userRepository.save(fakeUser);
    });


    it('getById', async () => {
        let user = await userRepository.getById(userId);
        expect(user).not.toBe(null);
        console.log(user);
        // user.createdAt = user.createdAt.getMilliseconds();
        expect(user).toEqual(fakeUser);
    });

    it('getByEmail', async () => {
        let user = await userRepository.getByEmail(fakeUser.email);
        expect(user).not.toBe(null);
        console.log(user);
        expect(user).toEqual(fakeUser);
    });


    it('usernameExists', async () => {
        let result = await userRepository.usernameExists(fakeUser.userName);
        expect(result).toBe(true);
        result = await userRepository.usernameExists("kaizen42304");
        expect(result).toBe(false);
    });

    it('emailExists', async () => {
        let result = await userRepository.emailExists(fakeUser.email);
        expect(result).toBe(true);
        result = await userRepository.emailExists("koa@gmail.com");
        expect(result).toBe(false);
    });


    it('getAuthSecret', async () => {
        let result = await userRepository.getAuthSecret(fakeUser.userId);
        expect(result).toBe(null);
    });

    it('setAuthSecret', async () => {
        await userRepository.setAuthSecret(fakeUser.userId , fakeAuthSecret);
        const authSecret = await userRepository.getAuthSecret(fakeUser.userId);
        console.log(authSecret);
        expect(authSecret).toBe(fakeAuthSecret);
    });

    it('should delete the user by id', async function () {
        await userRepository.deleteOne(userId);
        const deletedCustomer = await userRepository.getById(userId);
        expect(deletedCustomer).toBe(null);
    });

});