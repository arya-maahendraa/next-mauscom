import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
import styled from "styled-components";
import { IComment } from "../../server/interfaces/IComment";
import { Card, CardBody, CardTitleWrapper } from "../ui/Card/Card.styled";
import Comment from "./Comment";

const Navigation = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding-top: 1em;
   p {
      margin: 0 1em;
   }
`;

const NavigationButton = styled.button`
   background: transparent;
   padding: 0.5em 0.75em;
   svg {
      width: 20px;
   }
`;

const CommentsCardBody = styled(CardBody)`
   @media (min-width: ${(props) => props.theme.devices.desktop}) {
      height: 100%;
      padding-bottom: 1.25em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }
`;

const CommentsComp: FC<{
   title: string;
   comments: IComment[];
   perPage?: number;
}> = ({ title, comments, perPage = 5 }) => {
   const [currPage, setCurrPage] = useState(1);

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
   return (
      <Card style={{ paddingRight: 0, paddingLeft: 0 }}>
         <CardTitleWrapper style={{ padding: "0 1em" }}>
            <h1>{title}</h1>
         </CardTitleWrapper>
         <CommentsCardBody>
            <div>
               {getComments().map((comment) => (
                  <Comment key={comment.id} comment={comment} />
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
   );
};

export default CommentsComp;
