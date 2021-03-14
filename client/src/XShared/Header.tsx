import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ContainerCenter, HeadingBig, InlineFlex} from "./Components";
import {PrimaryButton} from "./Components/Buttons";
import {withShadowSM} from "./Components/Rules";

const HeaderContainer = styled.header`
    display:flex;
    width:100%;
    height: max-content;
    background-color: #ffffff;
    border-bottom: 1px solid #E5E5E5;
    ${withShadowSM}
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0.4rem 1rem;
`;


const HeaderTextLogo = styled(HeadingBig)`
  font-weight: 600;
  font-size: 1.2rem;
`;

const HeaderNav = styled.div`
  display:inline-flex;
  margin: 0;
  padding: 0;
`;

const HeaderNavigationLink = styled(Link)`
    padding:0;
    margin-right: 0.4rem;
    margin-left: 0.4rem;
    color: #111111;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

export const Header = () => {
    return (
        <HeaderContainer>
            <ContainerCenter>
                <HeaderWrapper>
                    <InlineFlex>
                        <HeaderTextLogo>AskingBad</HeaderTextLogo>
                    </InlineFlex>
                    <HeaderNav>
                        {/*<HeaderNavigationLink to={"/auth/register"}>*/}
                        {/*    <PrimaryButton outlined={true}>Create Account</PrimaryButton>*/}
                        {/*</HeaderNavigationLink>*/}
                        <HeaderNavigationLink to={"/auth/login"}>
                            <PrimaryButton>Login</PrimaryButton>
                        </HeaderNavigationLink>
                    </HeaderNav>
                </HeaderWrapper>
            </ContainerCenter>
        </HeaderContainer>
    )
}