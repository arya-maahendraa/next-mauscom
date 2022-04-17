import styled from "styled-components";

export const Button = styled.button`
   padding: 0.5em 1em;
   font-size: 0.8rem;
   color: #313131;
   border-radius: 5px;
`;

export const MoreDetailBtn = styled(Button)`
   margin-top: 1.5em;
   color: #6f6409;
   background-color: ${(props) => props.theme.mainYellow};
   font-weight: 600;
`;
