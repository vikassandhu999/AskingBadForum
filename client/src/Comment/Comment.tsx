import React, {FC, useState} from "react";
import styled from "styled-components";
import {Box, ImgAvatar, Para, Row} from "../XShared/Components";
import {PrimaryButton, TextButton} from "../XShared/Components/Buttons";
import {CommentModel} from "./CommentModel";

const CommentWrapper = styled.article`
  width: 100%;
  padding: 0.2rem;
  margin: 0;
`;

interface CommentProps {
    stackPosition : number;
}

export const Comment : FC<CommentProps> = ({stackPosition}) => {
    const [child,setChild] = useState<boolean>(false);

    return (
        <CommentWrapper>
            <Box height={1}/>
            <Row full={true} justifyContent={"flex-start"}>
                <ImgAvatar
                    width={"30px"}
                    src={"https://lh5.googleusercontent.com/-Nhssp4u1mFI/AAAAAAAAAAI/AAAAAAAABeE/T65T9JLh5lg/photo.jpg?sz=328"}
                    alt={"User avatar"}/>
                <Box width={0.4}/>
                <Para size={0.8}>@kaizen404</Para>
            </Row>
            <Box height={0.4}/>
            <Para size={0.8}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta, dolore eveniet facilis harum
                illo molestiae molestias nostrum officia reprehenderit suscipit tempora. Consequuntur deleniti in libero
                numquam odio porro recusandae.
            </Para>
            {
                child&&<CommentModel stackPosition={stackPosition + 1}/>
            }
            <TextButton onClick = {()=>setChild(true)}>
                Replies
            </TextButton>
        </CommentWrapper>
    )
}