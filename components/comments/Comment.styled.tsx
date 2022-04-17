import styled from "styled-components";

export const CommentStyled = styled.div`
   display: flex;
   padding: 0.5em 1.25em;
   border-top: 1px solid #e3e3e3;
   border-bottom: 1px solid #e3e3e3;
`;

export const CommentWrapper = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
`;

export const UserName = styled.h6`
   margin: 0;
   font-size: 0.7rem;
   font-weight: 600;
   color: #848484;
`;

export const UserCommnet = styled.p`
   font-size: 0.8rem;
   max-width: 45ch;
`;
