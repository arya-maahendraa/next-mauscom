import styled from "styled-components";

export const Card = styled.div`
   width: 100%;
   background-color: #fff;
   border: 1px solid #ccc;
   border-radius: 10px;
   padding: 1.25em 1em;
`;

export const CardTitleWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   h1 {
      color: ${(props) => [props.theme.textMain]};
      font-size: 1em;
      font-weight: 400;
   }
`;

export const CardBody = styled.div`
   padding-top: 0.8em;
   width: 100%;

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      padding-top: 1.2em;
   }
`;
