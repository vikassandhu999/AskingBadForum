import React, {FC} from "react";
import styled, {css} from "styled-components";
import {withShadowMD} from "./Rules";
import {Para, Row} from "./index";

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 1rem;
  border-radius: 0.2rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  cursor:pointer;
`;

interface PrimaryButtonProps {
    outlined?: boolean;
}

export const PrimaryButton = styled(Button)<PrimaryButtonProps>`
  ${withShadowMD}
  ${props => {
    return props.outlined ? css`
      background-color: #ffffff;
      border:2px solid #E5E5E5;
      color: #111111;
      &:hover {
          //background-color: #111111;
          //color: #ffffff;
          border-color: #111111;
      }
    ` : css`
      background-color: #3a3e48;
      border:2px solid  #3a3e48;
      color: #ffffff;
      &:hover {
          background-color:#8E94A3;
          color: #ffffff;
          border-color:#8E94A3;
      }
    `
}}`;

interface TextButtonProps {
  color ?: string;
}

export const TextButton = styled(Button)<TextButtonProps>`
  outline: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${props => props.color ?? "#111111"};
  &:hover {
    background-color: #807e7e;
  }
`;

interface IconButtonProps {
  icon?: string;
  text?:string;
}

export const IconButton : FC<IconButtonProps> = ({icon,text}) => {
  return (
      <Row padding={0.3}>
          {icon &&<Para size={1.2}><i className={icon}/></Para>}
          {text&&<Para>{text}</Para>}
      </Row>
  )
}
