import styled, { keyframes } from "styled-components";

const Rotate = keyframes`
   from {
      transform: rotate(0deg);
   }
   to {
      transform: rotate(360deg);
   }
`;

export const LoadingStyled = styled.div<{ height: number; width: number }>`
   position: relative;
   height: ${(props) => props.height}px;
   width: ${(props) => props.width}px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 99999px;
   background: #dcdcdc;
   overflow: hidden;

   &::after {
      content: "";
      position: absolute;
      top: ${(props) => props.height / 2}px;
      width: 190px;
      height: 210px;
      border-radius: 80px;
      background-color: ${(props) => props.theme.mainYellow};
      animation: ${Rotate} 5s linear infinite;
      z-index: 999999px;
   }
`;

export const MSGStyled = styled.p`
   margin-top: 1.5em;
   font-size: 0.8rem;
   color: ${(props) => props.theme.textMain};

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      font-size: 1rem;
   }
`;
