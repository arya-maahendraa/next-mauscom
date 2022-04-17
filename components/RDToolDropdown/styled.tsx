import styled from "styled-components";

export const ToolDropdown = styled.div`
   position: relative;
   display: flex;
   justify-content: end;
   margin-bottom: 10px;

   svg {
      pointer-events: none;
   }
`;

export const ToolDropdownBtn = styled.button`
   padding: 0.5em 0.25em;
   background-color: transparent;
   display: flex;
   align-items: center;
   color: ${(props) => props.theme.textMain};

   span {
      font-size: 0.9rem;
      font-weight: 300;
      letter-spacing: 1px;
      margin-right: 0.45em;
      pointer-events: none;
   }
`;

export const ToolItems = styled.ul`
   position: absolute;
   bottom: 0;
   opacity: 0;
   transform: translateY(100%);
   background-color: #fff;
   padding: 0.5em !important;
   box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   -webkit-box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   -moz-box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   border-radius: 5px;
   overflow: hidden;
   z-index: 999999;
`;

export const ToolItem = styled.li`
   cursor: pointer;
   min-width: 150px;
   display: flex;
   align-items: center;
   padding: 0.75em 1.5em;
   font-size: 0.9rem;
   border-radius: 5px;
   color: #626262;

   &:hover,
   &:active {
      background-color: darkgray;
      color: #fff;
   }
`;
