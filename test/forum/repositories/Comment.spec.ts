import {v4 as uuid} from "uuid";
require("dotenv").config();

import {mongooseConnection} from "../../../src/shared/infra/db/mongoose/connection";
import {User} from "../../../src/user/domain/User";
import {userRepository} from "../../../src/user/repositories";
import {Comment} from "../../../src/modules/forum0/domain/Comment";
import {commentRepository} from "../../../src/modules/forum0/repositories";

const fakePostId = uuid();
const fakeUserName = "kaizen404";
const fakeUserId = uuid();

const fakeComment0 = new Comment({
    userId : fakeUserId ,
    userName : fakeUserName ,
    postId : fakePostId,
    body : "Reply to thread0"
});

const fakeComment1 = new Comment({
    userId : fakeUserId ,
    userName : fakeUserName ,
    postId : fakePostId,
    body : "Reply to thread0" ,
});


const fakeReplyTo0 = new Comment({
    userId : fakeUserId ,
    userName : fakeUserName ,
    body : "Reply to comment0",
    postId : fakePostId,
    replyTo : fakeComment0.commentId
});


const fakeReplyTo1 = new Comment({
    userId : fakeUserId ,
    userName : fakeUserName ,
    body : "Reply to comment2",
    postId : fakePostId,
    replyTo : fakeComment1.commentId
});



describe('commentRepo', () => {
    let connection : any;
    let db;

    beforeAll(async () => {
        connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
        await commentRepository.deleteAll();
    });

    afterAll(async ()=>{
        await commentRepository.deleteAll();
        // @ts-ignore
        await connection.close();
    })

    it("save", async () => {
        await Promise.all([
            commentRepository.save(fakeComment0),
            commentRepository.save(fakeComment1),
            commentRepository.save(fakeReplyTo0),
            commentRepository.save(fakeReplyTo1)
        ]);
    });

    it('exists', async () => {
        const exists = await commentRepository.exists(fakeComment0.commentId);
        expect(exists).toBe(true);
        const exists1 = await commentRepository.exists(uuid());
        expect(exists1).toBe(false);
    });

    it('getById', async () => {
        const [r0,r1,r2,r3] = await Promise.all([
            commentRepository.getById(fakeComment0.commentId),
            commentRepository.getById(fakeComment1.commentId),
            commentRepository.getById(fakeReplyTo0.commentId),
            commentRepository.getById(fakeReplyTo1.commentId)
        ]);
        expect(r0).toEqual(fakeComment0);
        expect(r1).toEqual(fakeComment1);
        expect(r2).toEqual(fakeReplyTo0);
        expect(r3).toEqual(fakeReplyTo1);
    });


    it('getReplies', async () => {
        const repliesToPost = await commentRepository.getReplies(fakePostId);
        console.log(repliesToPost);
        expect(repliesToPost[0]).toEqual(fakeComment0);
        expect(repliesToPost[1]).toEqual(fakeComment1);
        const repliesToComment0 = await commentRepository.getReplies(fakePostId , fakeComment0.commentId);
        console.log(repliesToComment0);
        expect(repliesToComment0[0]).toEqual(fakeReplyTo0);
    });

});