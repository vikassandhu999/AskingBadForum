import React from "react";
import {Route, Redirect} from "react-router-dom";
import "./post.style.scss";
import {CreatePostComponent} from "./CreatePost";

export enum POST_ROUTES {
    BASE = "/post",
    CREATE = "/post/create",
    READ = "/post"
}

export const PostRouteComponent = () => {
    return (
        <div className="container">
            <Route exact path={POST_ROUTES.BASE} render = {() => <Redirect to={POST_ROUTES.CREATE}/>}/>
            <Route exact path={POST_ROUTES.CREATE} component={CreatePostComponent}/>
        </div>
    )
}