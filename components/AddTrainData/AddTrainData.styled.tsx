import styled from "styled-components";

export const AddTrainDataWrapper = styled.div`
   position: relative;
   height: 100%;
   padding: 1.5em 10px;
   overflow-x: hidden;

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
   }
`;
