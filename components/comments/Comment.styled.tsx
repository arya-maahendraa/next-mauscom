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
   white-space: pre-wrap; /* CSS3 */
   white-space: -moz-pre-wrap; /* Firefox */
   white-space: -pre-wrap; /* Opera <7 */
   white-space: -o-pre-wrap; /* Opera 7 */
   word-wrap: break-word; /* IE */
`;
