import { FC, useEffect, useRef } from "react";
import CommentsComp from "../comments/CommentsComp";
import { CardWrapper } from "./ResultDetails.styled";
import { gsap } from "gsap";
import { IComment } from "../../server/interfaces/IComment";

const Comments: FC<{
   display: string;
   comments: {
      positive: IComment[];
      negative: IComment[];
      undefined: IComment[];
   };
}> = ({ display, comments }) => {
   const cardWrapper = useRef<HTMLDivElement>(null!);
   useEffect(() => {
      if (display !== "hide") {
         cardWrapper.current.childNodes.forEach((node, key) => {
            gsap.from(node, {
               x: (key + 1) * 100,
               opacity: 0,
               duration: 0.45,
               ease: "back.out(1.7)",
            });
         });
      }
   }, [display]);
   return (
      <CardWrapper
         style={display === "hide" ? { display: "none" } : {}}
         ref={cardWrapper}
      >
         <CommentsComp title="Positive comments" comments={comments.positive} />
         <CommentsComp title="Negative comments" comments={comments.negative} />
         <CommentsComp
            title="Undefined comments"
            comments={comments.undefined}
         />
      </CardWrapper>
   );
};

export default Comments;
