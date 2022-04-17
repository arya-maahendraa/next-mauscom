import styled from "styled-components";

export const PagesIlustrationWrapper = styled.div`
   width: 100%;
   height: 100%;
   flex-direction: column;

   p {
      color: ${(props) => props.theme.textMain};
      font-size: 0.85rem;
      text-align: center;
      padding: 0 1.1em;
      max-width: 55ch;
      margin-top: 1em;
   }
`;
export const IlustrationWrapper = styled.div`
   width: 75%;
   max-width: 250px;
`;
