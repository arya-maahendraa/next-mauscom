import styled from "styled-components";

export const VidioDetailStyled = styled.div``;
export const Thumbnail = styled.div`
   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
   }
`;
export const Details = styled.div`
   margin-top: 0.75em;
   display: flex;
   flex-direction: column;
`;

export const VidioDetailWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   margin-bottom: .75em;
`;

export const VidioDetailItem = styled.div`
   font-size: 0.8rem;
   display: flex;
   align-items: center;
   margin-bottom: 0.5em;
   color: #3f3f3f;

   svg {
      width: 18px;
      margin-right: 10px;
   }

   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      margin-bottom: 1.5em;
   }
`;

export const VidioTitle = styled.p`
   margin-bottom: 0.65em;
   font-size: 0.9rem;
`;
