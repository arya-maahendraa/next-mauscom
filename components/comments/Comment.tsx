import Image from "next/image";
import { FC } from "react";
import { IComment } from "../../server/interfaces/IComment";
import { ProfileImgWrapper } from "../ui/ProfilePIcture/ProfilePicture.styled";
import {
   CommentStyled,
   CommentWrapper,
   UserCommnet,
   UserName,
} from "./Comment.styled";

const Comment: FC<{
   comment: IComment;
}> = ({ comment }) => {
   return (
      <CommentStyled>
         <ProfileImgWrapper>
            <img src={comment.authorProfileImageUrl} alt="profile picture" />
         </ProfileImgWrapper>
         <CommentWrapper>
            <UserName>{comment.authorDisplayName}</UserName>
            <UserCommnet>{`${comment.textOriginal.substring(0, 65)}${
               comment.textOriginal.length < 65 ? "" : "..."
            }`}</UserCommnet>
         </CommentWrapper>
      </CommentStyled>
   );
};

export default Comment;
