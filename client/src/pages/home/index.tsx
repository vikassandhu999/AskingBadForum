import React from "react";
import {PostCardList} from "./PostCardList";
import {CTAButton} from "../../shared/components/button";
import {POST_ROUTES} from "../post";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <main className="container">
            <div className="row">
                <aside className="col-lg-3">
                    <div className="box-80"></div>
                    <Link to={POST_ROUTES.CREATE}>
                        <CTAButton title={"Create Post"}/>
                    </Link>
                    <ul className="ulist">
                        <li>Home</li>
                        <li>Trending</li>
                        <li>Favs</li>
                    </ul>
                </aside>

                <main className="col-lg-9">
                    <PostCardList/>
                </main>
            </div>
        </main>
    )
}