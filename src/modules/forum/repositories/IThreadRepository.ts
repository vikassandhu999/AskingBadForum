import {Thread} from "../domain/Thread";

export interface IThreadRepository {
    save(thread : Thread) : Promise<void>
}