import React, {FC, useEffect, useState} from "react";
import {Comment} from "./Comment";
import styled from "styled-components";
import {Para} from "../XShared/Components";

const CommentListWrapper = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  padding: 0.4rem;
  max-height: 80vh;
  overflow-y: scroll;
  -ms-overflow-style: none;  
  background-color: #ffffff;
  scrollbar-width: none; 
    &::-webkit-scrollbar {
      display: none;
    }
 
`;

const CommentListItem = styled.li`
  padding: 0;
  width: 100%;
  margin: 0;
`;

interface CommentListProps {
    stackPosition : number;
}


const data = [1,3,4,5,6,7,8,4,6,5,3,2,23,4,6,7,6,4,3,4];

export const CommentList : FC<CommentListProps> = ({stackPosition}) => {

    const [loading,setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false),2000);
    },[]);

    return (
        <CommentListWrapper>
            {
                loading? <Para>Loading....</Para> : data.map((_) => {
                    return <CommentListItem>
                        <Comment stackPosition={stackPosition}/>
                    </CommentListItem>
                })
            }
        </CommentListWrapper>
    )
}