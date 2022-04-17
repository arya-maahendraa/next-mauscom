import styled from "styled-components";

export const HeaderStyled = styled.nav`
   position: absolute;
   top: 0;
   height: 0;
   height: 50px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   width: 100%;
   z-index: 10;

   @media (min-width: ${(props) => props.theme.devices.tablet}) {
      height: 75px;
      flex-wrap: nowrap;
   }

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      max-width: 1100px;
      left: 50%;
      transform: translateX(-50%);
      padding-left: 2em;
      padding-right: 2em;
      justify-content: start;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      height: 100px;
      max-width: 1400px;
      padding-left: 4em;
      padding-right: 4em;
   }
`;

export const LogoWrapper = styled.div`
   padding: 0 1em;
   height: 100%;

   a {
      color: ${(props) => props.theme.iconGray};
      font-weight: 800;

      @media (min-width: ${(props) => props.theme.devices.tablet}) {
         font-size: 1.2rem;
      }

      @media (min-width: ${(props) => props.theme.devices.desktop}) {
         font-size: 1.5rem;
      }
   }

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      min-width: 150px;
   }
`;

export const DotsIconWrapper = styled.div`
   padding: 0 1em;
   color: ${(props) => props.theme.iconGray};
   cursor: pointer;

   @media (min-width: ${(props) => props.theme.devices.tablet}) {
      order: 2;
   }

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      min-width: 150px;
   }
`;

export const VidioUrlWrapper = styled.div`
   /* position: relative; */
   width: 100%;
   padding: 0 0.75em;

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      order: 1;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      font-size: 1.5rem;
   }
`;
