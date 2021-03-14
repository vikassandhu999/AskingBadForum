import React from "react";
import {Container, ContainerCenter, Wrapper} from "../XShared/Components";
import {Home} from "./Home";
import {Header} from "../XShared/Header";

export const HomeRouter = () =>{
    return (
        <Wrapper>
            <Header/>
            <ContainerCenter>
               <Home/>
            </ContainerCenter>
        </Wrapper>
    )
}