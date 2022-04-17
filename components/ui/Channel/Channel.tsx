import Image from "next/image";
import { FC } from "react";
import { ProfileImgWrapper } from "../ProfilePIcture/ProfilePicture.styled";
import { ChanelStyled, ChannelName } from "./Chanel.styled";

const Channel: FC<{ chanelName: string; profilePic: string }> = ({
   chanelName,
   profilePic,
}) => {
   return (
      <ChanelStyled>
         <ProfileImgWrapper>
            <img src={profilePic} alt="" />
         </ProfileImgWrapper>
         <ChannelName>{chanelName}</ChannelName>
      </ChanelStyled>
   );
};

export default Channel;
