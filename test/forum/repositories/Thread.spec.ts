import {v4 as uuid} from "uuid";
require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import {threadRepository} from "../../../src/modules/forum/repositories";
import {Thread} from "../../../src/modules/forum/domain/Thread";

const fakeThreadId = uuid();
const fakeUserName = "kaizen404";
const fakeUserId = uuid();

const fakeThread0 = new Thread({
    userId : fakeUserId ,
    userName : fakeUserName ,
    threadId : fakeThreadId,
    title : "This is an awesome thread",
    body : "Reply to thread0"
});

describe('threadRepo', () => {
    let connection : any;
    let db;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
        await threadRepository.deleteAll();
    });

    afterAll(async ()=>{
        await threadRepository.deleteAll();
        // @ts-ignore
        await connection.close();
    })

    it("save", async () => {
        await threadRepository.save(fakeThread0);
    });

    it('exists', async () => {
        const exists = await threadRepository.exists(fakeThread0.threadId);
        expect(exists).toBe(true);
        const exists1 = await threadRepository.exists(uuid());
        expect(exists1).toBe(false);

    });

    it('getById', async () => {
        const result = await threadRepository.getById(fakeThread0.threadId);
        expect(result).toEqual(fakeThread0);
    });

});