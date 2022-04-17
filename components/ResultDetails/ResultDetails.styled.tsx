import styled from "styled-components";

export const ResultDetailsStyled = styled.div`
   position: relative;
   height: 100%;

   /* display: flex;
   flex-direction: column;
   gap: 10px; */
   /* padding: 10px; */
   padding: 1.5em 10px;
   overflow-x: hidden;

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
   }
`;

export const CardWrapper = styled.div`
   width: "100%";
   display: flex;
   flex-direction: column;
   row-gap: 10px;

   @media (min-width: ${(props) => props.theme.devices.tablet}) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row: 2;
      flex-direction: unset;
      gap: 10px;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      grid-template-columns: repeat(3, 1fr);
      grid-row: 1;
   }
`;
