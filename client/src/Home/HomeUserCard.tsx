import React from "react";
import styled from "styled-components";
import {withShadowSM} from "../XShared/Components/Rules";
import {Box, Col, Para, Row} from "../XShared/Components";
import {Button} from "../XShared/Components/Buttons";

const UserCard = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.2rem;
 
  //border:2px solid #E5E5E5;
  background-color: #ffffff;
`;
// ${withShadowSM};
const UserAvatar = styled.img`
  display: block;
  max-width:60px;
  width: 100%;
  border-radius: 100%;
   border:2px solid #E5E5E5;
  overflow: hidden;
`;

const VisitProfileButton = styled(Button)`
  background-color: #111111;
  padding: 0.4rem 1rem;
  width: 100%;
  color: #ffffff;
  border: 0;
`;

const UserInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const HomeUserCard = () => {
    return (
        <UserCard>
            <Row>
                <UserAvatar
                    src={"https://lh5.googleusercontent.com/-Nhssp4u1mFI/AAAAAAAAAAI/AAAAAAAABeE/T65T9JLh5lg/photo.jpg?sz=328"}
                    alt={"User avatar"}/>
                <UserInfoRow>
                    <Col padding={0.4}>
                        <Para>30</Para>
                        <Para>Posts</Para>
                    </Col>
                    <Col padding={0.4}>
                        <Para>10k</Para>
                        <Para>Following</Para>
                    </Col>
                    <Col padding={0.4}>
                        <Para>3M</Para>
                        <Para>Followers</Para>
                    </Col>
                </UserInfoRow>
            </Row>
            <Box height={1}/>
            <Row full={true} justifyContent={"flex-start"}>
                <Para>kaizen404</Para>
            </Row>
            <Box height={0.6}/>
            <Row full={true} justifyContent={"flex-start"}>
                <Para size={0.9}>I'm a software programmer</Para>
            </Row>
            <Box height={1}/>
            <VisitProfileButton>
                Edit Profile
            </VisitProfileButton>
        </UserCard>
    );
}