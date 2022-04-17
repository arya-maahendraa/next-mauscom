import styled from "styled-components";

export const FooterStyled = styled.footer`
   position: absolute;
   bottom: 0;
   left: 0;
   height: 3em;
   width: 100%;
   text-align: center;
   font-size: 0.7rem;
   color: #5f5f5f;

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      font-size: .9rem;
   }
`;
