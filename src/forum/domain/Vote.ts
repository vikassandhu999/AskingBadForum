enum TopicType {
    POST = "post",
    COMMENT = "comment"
}

enum VoteValue {
    UP = 1,
    DOWN = -1
}

export interface IVote {
    topicId: string;
    creatorId: string;
    topicType: TopicType;
    voteValue: VoteValue;
    createdAt: Date;
}

interface VoteProps {
    topicId: string;
    creatorId: string;
    topicType: TopicType;
    voteValue: VoteValue;
    createdAt?: Date;
}

export class Vote {
    state: IVote;

    constructor(props: VoteProps) {
        this.state = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    get topicId(): string {
        return this.state.topicId;
    }

    get creatorId(): string {
        return this.state.creatorId;
    }

    get topicType(): TopicType {
        return this.state.topicType;
    }

    get voteValue(): VoteValue {
        return this.state.voteValue;
    }

    get createdAt(): Date {
        return this.state.createdAt;
    }
}