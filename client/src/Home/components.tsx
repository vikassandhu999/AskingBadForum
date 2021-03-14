import styled from "styled-components";

export const HomeMain = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
   @media (max-width: 768px) {
   display: flex;
    flex-direction: column;
  }
`;

export const HomeAside = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
`;

export const HomeContent = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
    min-height: 100vh;

`;