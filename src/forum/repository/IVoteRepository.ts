import {Vote} from "../domain/Vote";

export interface IVoteRepository {
    getVote(topicId: string, creatorId: string): Promise<Vote>

    saveVote(vote: Vote): Promise<void>
}