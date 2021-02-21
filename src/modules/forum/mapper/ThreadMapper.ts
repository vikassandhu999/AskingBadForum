import {Thread} from "../domain/Thread";

export class ThreadMapper {
    toDomain(raw : any) : Thread {
        return new Thread({
            userId : raw.user_id,
            userName : raw.user_name,
            threadId : raw.thread_id,
            title : raw.title,
            body : raw.body,
            createdAt : raw.created_at,
            updatedAt : raw.updated_at,
        });
    }

    toPersistence(thread : Thread) : any {
        return {
            user_id : thread.userId,
            user_name : thread.userName,
            thread_id : thread.threadId,
            title : thread.title,
            body : thread.body,
            created_at : thread.createdAt,
            updated_at : thread.updatedAt
        }
    }
}