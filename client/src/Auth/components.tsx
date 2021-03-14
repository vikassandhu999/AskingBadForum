import React from "react";
import styled from "styled-components";
import {withShadowLG} from "../XShared/Components/Rules";
import {Flex, HeadingBig} from "../XShared/Components";

export const AuthForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem 1rem;
`;
//  // ${withShadowLG//};
export const PaperAuthForm = styled(AuthForm)`
`;

export const FormHeading = styled(HeadingBig)`
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const AuthLayout = styled.div`
  width : 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 514px 1fr;
`;

export const AuthLayoutSidebar = styled.aside`
  width: 100%;
  display: block;
  min-height: 100vh;
  background-color: #f2d184;
//\tcolor: #866118;
`;

export const AuthLayoutContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const AuthHeader = styled(Flex)`
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  padding: 1.4rem 1rem;
`;