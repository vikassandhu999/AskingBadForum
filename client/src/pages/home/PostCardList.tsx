import React, {FC} from "react";
import {Post} from "./domain/Post";
import "./home.style.scss";
import { VoteButton } from "../../shared/components/inputs/VoteButton";

const jsonPost = '{"userId":"52672422-45e3-46f1-9944-b9bec90c5427","userName":"kaizen404","threadId":"407bbe2f-8563-49c2-bb9b-b17586c67196","title":"This is an awesomefghdfghfgh thread","body":"This is the body dfhnrfghdfhffor the awesome thread sadfkljaskldjflkasdfkljasdflkjaslkdfjkqwhfksdjahkljasdhfkljwqhejklfjklahsdlfhasldjkfh I was an absolute genius at the first time","createdAt":"2021-02-26T07:48:29.820Z","updatedAt":"2021-02-26T07:48:29.820Z"}';

const list: Post[] = [
    JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost),
    JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost),
    JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost), JSON.parse(jsonPost)];

interface PostCardProps {
    post: Post;
}

const PostCard: FC<PostCardProps> = (props) => {
    const post = props.post;
    post.createdAt = new Date(post.createdAt);
    return (
        <article id={post.threadId} className="post-card">
                <div className="post-card-top">
                    <span className="username"> @{post.userName}</span>
                    <span className="date">30 minutes ago</span>
                    {/*<span className="date">at {post.createdAt.toLocaleDateString()} {post.createdAt.toLocaleTimeString()}</span>*/}
                </div>

                <div className="post-card-content">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>

                <div className = "post-card-bottom">
                    <div className="action-button">
                        <span><i className="fal fa-comment"></i>
                            </span>32 Comments
                    </div>
                    <VoteButton/>
                </div>
        </article>
    )
}


export const PostCardList = () => {
    return (
        <ul className="post-card-list">
            {
                list.map((post) => {
                    return <li>
                        <PostCard post={post}/>
                    </li>
                })
            }
        </ul>
    );
}