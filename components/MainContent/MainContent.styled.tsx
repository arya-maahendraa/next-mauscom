import styled from "styled-components";

export const MainContentStyled = styled.div`
   position: relative;
   display: flex;
   min-height: 100vh;
   width: 100%;
   padding-top: 100px;
   padding-bottom: 3em;

   @media (min-width: ${(props) => props.theme.devices.tablet}) {
      padding-top: 75px;
   }

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      margin: 0 auto;
      max-width: 1000px;
      padding-left: 2em;
      padding-right: 2em;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      max-width: 1400px;
      padding-top: 100px;
      padding-left: 4em;
      padding-right: 4em;
   }
`;
export const ContentWrapper = styled.div`
   width: 100%;
   &.loading {
      height: 100%;
   }
`;
