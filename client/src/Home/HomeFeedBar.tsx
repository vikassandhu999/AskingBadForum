import React from "react";
import {Box, Col, ImgAvatar, Para, Row, XLink} from "../XShared/Components";
import styled from "styled-components";
import {IconButton} from "../XShared/Components/Buttons";

const FeedList = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  max-height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;  
  scrollbar-width: none; 
    &::-webkit-scrollbar {
      display: none;
    }
 
`;

const FeedListItem = styled.li`
  padding: 0;
  width: 100%;
  margin: 0;
`;


const FeedPostCard = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.6rem;
  padding-bottom: 1rem;
  border-radius: 0.2rem;
  background-color: #ffffff;
`;

const PostTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: #111111;
  text-align: left;
  width: 100%;
`;

const PostMedia = styled.img`
  display: block;
  width: 100%;
  //border-radius: 100%;
  //overflow: hidden;
`;

// border:2px solid #E5E5E5;

const data = [1, 2, 3, 4, 5, 5];

export const HomeFeedBar = () => {
    return (
        <Col alignItems={"flex-start"} alignContent={"flex-start"}>
            <FeedList>
                <Box height={4}/>
                {
                    data.map(() => {
                        return <FeedListItem>
                            <FeedPostCard>
                                <Row full={true} justifyContent={"flex-start"}>
                                    <ImgAvatar
                                        width={"30px"}
                                        src={"https://lh5.googleusercontent.com/-Nhssp4u1mFI/AAAAAAAAAAI/AAAAAAAABeE/T65T9JLh5lg/photo.jpg?sz=328"}
                                        alt={"User avatar"}
                                    />
                                    <XLink title={"@kaizen404"} to={'/'}/>
                                    <Box width={0.6}/>
                                    <Para size={0.8}>
                                        3 hours ago...
                                    </Para>
                                </Row>
                                <PostTitle>
                                    Why we are living in this society of greats
                                </PostTitle>
                                <PostMedia
                                    src={"https://lh5.googleusercontent.com/-Nhssp4u1mFI/AAAAAAAAAAI/AAAAAAAABeE/T65T9JLh5lg/photo.jpg?sz=328"}
                                    alt={"User avatar"}
                                />
                                <Box height={1}/>
                                <Para size={0.8}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto debitis
                                    dolorem earum maiores molestiae, numquam omnis, possimus provident quos tempore
                                    veritatis. Aliquid architecto, deserunt dolorem dolores eius et harum nesciunt qui!
                                    Amet cum maiores, quam quas quidem saepe tempora.
                                </Para>
                                <Box height={0.4}/>
                                <Row full={true} justifyContent={"flex-start"}>
                                    <IconButton icon={"fal fa-heart"}/>
                                    <IconButton icon={"fal fa-comment"}/>
                                </Row>
                            </FeedPostCard>
                        </FeedListItem>
                    })
                }
            </FeedList>
        </Col>
    )
}