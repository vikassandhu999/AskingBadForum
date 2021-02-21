import {IThreadRepository} from "../IThreadRepository";
import {ThreadModel} from "../../infra/database/mongoose/models/ThreadModel";
import {Thread} from "../../domain/Thread";
import {ThreadMapper} from "../../mapper/ThreadMapper";

export class MongooseThreadRepository implements IThreadRepository {
    private readonly model = ThreadModel;

    async exists(threadId: string): Promise<boolean> {
        const exists = await this.model.exists({thread_id : threadId});
        return !!exists;
    }

    async getById(threadId: string): Promise<Thread | null> {
        const thread = await this.model.findOne({thread_id : threadId});
        if(!thread) return null;
        return ThreadMapper.toDomain(thread);
    }

    async save(thread: Thread): Promise<void> {
        const newThread = new this.model(ThreadMapper.toPersistence(thread));
        await newThread.save();
    }

    async deleteAll() : Promise<void> {
        await this.model.deleteMany();
    }
}