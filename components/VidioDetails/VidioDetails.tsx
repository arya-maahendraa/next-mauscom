import { ThumbUpIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import Channel from "../ui/Channel/Channel";
import {
   Thumbnail,
   Details,
   VidioDetailStyled,
   VidioTitle,
   VidioDetailWrapper,
   VidioDetailItem,
} from "./VidioDetails.styled";
import vidioDetailsState from "../../store/vidioDetails";
import Image from "next/image";

const VidioDetails = () => {
   const vidioDetails = useRecoilValue(vidioDetailsState);

   return (
      <VidioDetailStyled>
         <Thumbnail>
            <img src={vidioDetails.thumbnails} alt="Vidio thumbnail" />
         </Thumbnail>
         <Details>
            <VidioTitle>{vidioDetails.title}</VidioTitle>

            <VidioDetailWrapper>
               <VidioDetailItem>
                  <ThumbUpIcon />
                  {vidioDetails.likes} likes
               </VidioDetailItem>
               <VidioDetailItem>{vidioDetails.view} view</VidioDetailItem>
               <VidioDetailItem>
                  {vidioDetails.comments} commnets
               </VidioDetailItem>
            </VidioDetailWrapper>

            <Channel
               chanelName={vidioDetails.channelTitle}
               profilePic={vidioDetails.profilePicture}
            />
         </Details>
      </VidioDetailStyled>
   );
};

export default VidioDetails;
