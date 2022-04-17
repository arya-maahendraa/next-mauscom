import styled from "styled-components";

export const MenusStyled = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   background-color: #191919f2;
   display: flex;
   flex-direction: column;
   z-index: 9999999999;
`;
export const CloseButtonWrapper = styled.div`
   display: flex;
   width: 100%;
   height: 3.75em;
   padding: 0 1em;
   justify-content: end;
`;
export const CloseButton = styled.button`
   padding: 0;
   background-color: transparent;

   svg {
      width: 30px;
      height: 30px;
      color: white;
   }
`;

export const MenuItems = styled.ul`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding-top: 1em;
`;

export const MenuItem = styled.li`
   height: fit-content;
   a {
      display: block;
      padding: 0.5em 0.8em;
      color: white;
      font-size: 1.75rem;
   }

   a:hover,
   a:active {
      color: ${(props) => props.theme.mainYellow};
   }
`;

export const LanguageToggleButton = styled.div`
   position: relative;
   background-color: #9c9c9c;
   border-radius: 99999px;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.75em;
      height: 2.75em;
      color: black;
      text-align: center;
   }

   &::after {
      content: "";
      position: absolute;
      /* top: 0; */
      /* right: 4px; */
      height: calc(100% - 8px);
      width: calc(50% - 8px);
      background-color: ${(props) => props.theme.mainYellow};
      border-radius: 999999px;
      transition: all 0.5s cubic-bezier(0.2, 0.85, 0.32, 1.2);
   }

   &.ID::after {
      transform: translateX(calc(50% + 4px));
   }
   &.EN::after {
      transform: translateX(calc(-50% - 4px));
   }
`;
