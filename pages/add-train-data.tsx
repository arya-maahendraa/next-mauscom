import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AddTrainDataWrapper } from "../components/AddTrainData/AddTrainData.styled";
import Comments from "../components/AddTrainData/Comments";
import { IComment } from "../server/interfaces/IComment";
import processedComments from "../store/processedComments";

const AddTrainData: NextPage = () => {
   const comments = useRecoilValue(processedComments);
   const [currCategory, setCurrCategory] = useState(1);
   let currComments: IComment[] = [];
   if (currCategory === 1) currComments = comments.positive;
   else if (currCategory === -1) currComments = comments.negative;
   else currComments = comments.undefined;

   return (
      <AddTrainDataWrapper>
         <Comments
            title="Positive comments"
            comments={currComments}
            perPage={10}
            setCurrCategory={setCurrCategory}
         />
      </AddTrainDataWrapper>
   );
};

export default AddTrainData;
