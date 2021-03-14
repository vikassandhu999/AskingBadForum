import React, {FC} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {AuthHeader} from "../../Auth/components";

export const Wrapper = styled.div`
   width: 100%;
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
`;

export const ContainerCenter = styled(Container)`
  margin-left: auto;
  margin-right: auto;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props)=>props.dir??"row"};
`;

export const InlineFlex = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: max-content;
`;

export const InlineBlock = styled.div`
  display: inline-block;
  width: max-content;
`;

export const HeadingBig = styled.h1`
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

interface ParaProps {
    color ?:string;
    size?:number;
}

export const Para = styled.p<ParaProps>`
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-size: ${props=>props.size??1}rem;
  color: ${props=>props.color??"#111111"};
`;


export const AlertError = styled(Para)`
  margin: 0 0 1rem;
  color: #d31616;
  padding: 0.2rem 0.1rem;
  text-align: left;
  border-radius: 0.2rem;
`;

interface BoxProps {
    height ?:number;
    width?:number;
}

export const Box = styled.div<BoxProps>`
  margin-top: ${props=>props.height??0}rem;
  margin-right: ${props=>props.width??0}rem;
  display: block;
  height: 0;
`;

export const StyledLink = styled(Link)`
    padding:0;
    margin-right: 0.4rem;
    margin-left: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    width: max-content;
`;

interface XLinkProps {
    info?:string;
    title : string;
    to :string;
    color?:string;
}

export const XLink : FC<XLinkProps> = ({info,title,to,color})=> {
    return (
        <InlineFlex>
            {info&&<Para>{info}</Para>}
            <StyledLink to={to}>
                <Para color={color}>{title}</Para>
            </StyledLink>
        </InlineFlex>
    )
}

interface RowProps {
    justifyContent ?: string;
    alignContent ?: string;
    alignItems?:string;
    padding?:number;
    full?:boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  width: ${props=>props.full?'100%' : 'max-content'};
  justify-content: ${props=>props.justifyContent??"center"};
  align-items: ${props=>props.alignItems??"center"};
  align-content: ${props=>props.alignContent??"center"};
  padding: ${props=>props.padding??0}rem;
`;

interface ColProps {
    justifyContent ?: string;
    alignContent ?: string;
    alignItems?:string;
    padding?:number;
}

export const Col = styled.div<ColProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${props=>props.justifyContent??"center"};
  align-items: ${props=>props.alignItems??"center"};
  align-content: ${props=>props.alignContent??"center"};
   padding: ${props=>props.padding??0}rem;
`;

interface ImgAvatarProps {
    width : string;
}

export const ImgAvatar = styled.img`
  display: block;
  max-width:${props=>props.width??"60px"};
  width: 100%;
  border-radius: 100%;
  overflow: hidden;
`;
