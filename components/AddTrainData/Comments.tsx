import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { IComment } from "../../server/interfaces/IComment";
import Comment from "./Comment";
import { Card, CardTitleWrapper } from "../ui/Card/Card.styled";
import {
   CommentsCardBody,
   Navigation,
   NavigationButton,
   SaveToTrainWrapper,
   SelectCategoriy,
} from "./Comments.styled";
import { addTrainData } from "../../libs/Youtube";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorMessageState } from "../../store/errorMessageState";
import { pageIsLoading } from "../../store/page";

const Comments: FC<{
   title: string;
   comments: IComment[];
   perPage?: number;
   setCurrCategory: Dispatch<SetStateAction<number>>;
}> = ({ title, comments, perPage = 5, setCurrCategory }) => {
   const [selectedComments, setSelectedComments] = useState<
      { id: string; comment: string; class: number }[]
   >([]);
   const [currPage, setCurrPage] = useState(1);
   const setErrorMessage = useSetRecoilState(errorMessageState);
   const [_, setPageIsLoading] = useRecoilState(pageIsLoading);

   const getComments = () => {
      const start = currPage * perPage - perPage;
      const end = start + perPage;
      return comments.slice(start, end);
   };

   const nextPageHandler = () => {
      if (currPage >= Math.ceil(comments.length / perPage)) return;
      setCurrPage((prev) => prev + 1);
   };
   const prevPageHandler = () => {
      if (currPage <= 1) return;
      setCurrPage((prev) => prev - 1);
   };

   const selectCategoryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedComments([]);
      setCurrCategory(parseInt(e.target.value));
   };

   const addSelectedComments = (comment: IComment, category: number) => {
      setSelectedComments((prev) => [
         ...prev,
         {
            id: comment.id,
            comment: comment.textOriginal,
            class: category,
         },
      ]);
      selectedComments.push();
   };

   const removeSelectedComments = (id: string) => {
      setSelectedComments((prev) => prev.filter((item) => item.id !== id));
   };

   const addToTranBtnClickHandler = async () => {
      if (selectedComments.length <= 0) return;
      try {
         setPageIsLoading({
            status: true,
            msg: "Saving new train data.",
         });
         await addTrainData(selectedComments);
         setSelectedComments([]);
         setPageIsLoading({
            status: false,
            msg: "",
         });
      } catch (err: any) {
         setErrorMessage({
            status: 0,
            msg: err.response.data.errors.message,
         });
      }
   };

   return (
      <div>
         <SaveToTrainWrapper>
            <label>{`Total: ${selectedComments.length} comments`}</label>
            <button onClick={addToTranBtnClickHandler}>Add to Train</button>
         </SaveToTrainWrapper>
         <Card style={{ paddingRight: 0, paddingLeft: 0 }}>
            <CardTitleWrapper style={{ padding: "0 1em" }}>
               <h1>{title}</h1>
               <SelectCategoriy
                  onChange={selectCategoryChangeHandler}
                  defaultValue={1}
               >
                  <option value={1}>Positive</option>
                  <option value={-1}>Negative</option>
                  <option value={0}>Undefined</option>
               </SelectCategoriy>
            </CardTitleWrapper>
            <CommentsCardBody>
               <div>
                  {getComments().map((comment) => (
                     <Comment
                        key={comment.id}
                        comment={comment}
                        addHandler={addSelectedComments}
                        removeHandler={removeSelectedComments}
                        selected={
                           selectedComments.findIndex(
                              (item) => item.id === comment.id
                           ) === -1
                              ? false
                              : true
                        }
                     />
                  ))}
               </div>
               <Navigation>
                  <NavigationButton
                     className="flex-center"
                     onClick={prevPageHandler}
                  >
                     <ChevronLeftIcon />
                  </NavigationButton>
                  <p>{currPage}</p>
                  <NavigationButton
                     className="flex-center"
                     onClick={nextPageHandler}
                  >
                     <ChevronRightIcon />
                  </NavigationButton>
               </Navigation>
            </CommentsCardBody>
         </Card>
      </div>
   );
};

export default Comments;
