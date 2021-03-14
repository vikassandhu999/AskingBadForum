import React from "react";
import {HomeAside, HomeContent, HomeMain} from "./components";
import {Box, Col} from "../XShared/Components";
import {HomeUserCard} from "./HomeUserCard";
import {CommentModel} from "../Comment/CommentModel";
import {HomeFeedBar} from "./HomeFeedBar";

export const Home = () =>{
    return (
        <HomeMain>
            <HomeContent>
                {/*<CommentList/>*/}
                <HomeFeedBar/>
            </HomeContent>
            <HomeAside>
                <Box height={3}/>
                <HomeUserCard/>
            </HomeAside>
            {/*<CommentModel stackPosition={111}/>*/}
        </HomeMain>
    )
}