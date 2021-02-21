import {Thread} from "../domain/Thread";

export interface IThreadRepository {
    save(thread : Thread) : Promise<void>
    exists(threadId : string) : Promise<boolean>
    getById(threadId : string) : Promise<Thread | null>
}