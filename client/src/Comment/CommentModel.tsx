import React, {FC} from "react";
import styled from "styled-components";
import {CommentList} from "./CommentList";

interface CommentModelProps {
    stackPosition : number;
}

interface ModelProps {
    zIndex?: number;
}

const Model = styled.div<ModelProps>`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.zIndex ?? 1};
  background-color: rgba(90,87,87,0.3);
`;

export const CommentModel : FC<CommentModelProps> = ({stackPosition}) => {
    return <Model zIndex={stackPosition}>
        <CommentList stackPosition = {stackPosition}/>
    </Model>
}