import {v4 as uuid} from "uuid";
require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import { Post } from "../../../src/modules/forum0/domain/Post";
import { postRepository } from "../../../src/modules/forum0/repositories/index";


const fakePostId = uuid();
const fakeUserName = "kaizen404";
const fakeUserId = uuid();

const fakePost0 = new Post({
    userId : fakeUserId ,
    userName : fakeUserName ,
    postId : fakePostId,
    title : "This is an awesome thread",
    body : "Reply to thread0"
});

describe('threadRepo', () => {
    let connection : any;
    let db;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
        await postRepository.deleteAll();
    });

    afterAll(async ()=>{
        await postRepository.deleteAll();
        // @ts-ignore
        await connection.close();
    })

    it("save", async () => {
        await postRepository.save(fakePost0);
    });

    it('exists', async () => {
        const exists = await postRepository.exists(fakePost0.postId);
        expect(exists).toBe(true);
        const exists1 = await postRepository.exists(uuid());
        expect(exists1).toBe(false);

    });

    it('getById', async () => {
        const result = await postRepository.getById(fakePost0.postId);
        expect(result).toEqual(fakePost0);
    });

});