import styled from "styled-components";
import { CardBody } from "../ui/Card/Card.styled";

export const SelectCategoriy = styled.select`
   padding: 0.35em 0.255em;
   margin: 0 1px;
   color: ${(props) => [props.theme.textMain]};
   font-size: .8rem;
   font-weight: 400;
   z-index: 10;
   option {
      font-size: 0.875rem;
   }
`;

export const Navigation = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding-top: 1em;
   p {
      margin: 0 1em;
   }
`;

export const NavigationButton = styled.button`
   background: transparent;
   padding: 0.5em 0.75em;
   svg {
      width: 20px;
   }
`;

export const CommentsCardBody = styled(CardBody)`
   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      height: 100%;
      padding-bottom: 1.25em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }
`;

export const SaveToTrainWrapper = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1em;

   label {
      font-size: 0.9rem;
   }

   button {
      padding: 0.5em .85em;
      font-size: 0.9rem;
      color: #313131;
      border-radius: 5px;
      background-color: ${(props) => props.theme.mainYellow};
   }
`;
