import { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { IComment } from "../../server/interfaces/IComment";
import {
   CommentStyled,
   CommentWrapper,
   UserCommnet,
   UserName,
} from "../comments/Comment.styled";

const Wrapper = styled.div`
   display: flex;
   justify-content: end;
   align-items: center;
   column-gap: 0.5em;
   margin-top: 0.75em;
`;
const CommentCategory = styled.select`
   padding: 0.4em 0.75em;
   font-size: 0.7rem;
   font-weight: 600;
   /* border: none; */
   border-radius: 9999px;
`;

const AddToTrainDataBtn = styled.button`
   padding: 0.4em 0.75em;
   font-size: 0.7rem;
   font-weight: 600;
   border-radius: 9999px;
   background-color: ${(props) => props.theme.mainYellow};
`;

const Comment: FC<{
   comment: IComment;
   addHandler: (comment: IComment, category: number) => void;
   removeHandler: (id: string) => void;
   selected: boolean;
}> = ({ comment, addHandler, removeHandler, selected }) => {
   const [category, setCategory] = useState(1);
   // const [selected, setSelected] = useState(false);
   const CommentCategoryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setCategory(parseInt(e.target.value));
      removeHandler(comment.id);
   };
   const AddToTrainDataBtnCLickHandler = () => {
      if (selected) removeHandler(comment.id);
      else addHandler(comment, category);
   };
   return (
      <CommentStyled>
         <CommentWrapper>
            <UserName>{comment.authorDisplayName}</UserName>
            <UserCommnet>{comment.textOriginal}</UserCommnet>
            <Wrapper>
               <CommentCategory
                  onChange={CommentCategoryChangeHandler}
                  defaultValue={1}
               >
                  <option value={1}>Positive</option>
                  <option value={-1}>Negative</option>
                  <option value={0}>Undefined</option>
               </CommentCategory>
               <AddToTrainDataBtn
                  onClick={AddToTrainDataBtnCLickHandler}
                  style={{ backgroundColor: selected ? "gray" : "" }}
               >
                  {selected ? "remove" : "add"}
               </AddToTrainDataBtn>
            </Wrapper>
         </CommentWrapper>
      </CommentStyled>
   );
};

export default Comment;
