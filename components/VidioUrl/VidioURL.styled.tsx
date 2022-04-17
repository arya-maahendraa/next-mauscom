import styled from "styled-components";

export const VidioURLStyled = styled.div`
   position: relative;
   background: white;
   /* height: 100%; */
   width: 100%;
   display: flex;
   align-items: center;
   border-radius: 999999px;
   box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   -webkit-box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   -moz-box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 50%);
   overflow: hidden;

   @media (min-width: ${(props) => props.theme.devices.latop}) {
      max-width: 500px;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      max-width: 600px;
   }
`;
export const VidioURLInput = styled.input`
   /* width: 100%; */
   flex: 1;
   border: none;
   font-size: 0.85rem;
   color: #5d5d5d;
   padding: 0 5px 0 1.5em;
   outline: none;

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      font-size: 1rem;
   }
`;
export const ProcessBtn = styled.button`
   height: 40px;
   width: 40px;
   background: ${(props) => props.theme.mainYellow};
   border-radius: 99999px;
   margin: 5px;
   z-index: 999999;

   &:focus {
      outline: none;
   }
`;
