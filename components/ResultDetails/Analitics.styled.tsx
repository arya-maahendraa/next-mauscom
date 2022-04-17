import styled from "styled-components";
import { Card } from "../ui/Card/Card.styled";
import { CardWrapper } from "./ResultDetails.styled";

export const AnaliticsCardWrapper = styled(CardWrapper)``;

export const CardWordCloud = styled(Card)`
   @media (min-width: ${(props) => props.theme.devices.tablet}) {
      grid-column: span 2;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      grid-column: unset;
   }
`;
