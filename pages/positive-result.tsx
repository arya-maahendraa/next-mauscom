import { NextPage } from "next";
import { useRef } from "react";
import PositiveIlustration from "../components/ilustration/PositiveIlustration";
import useAnimatePageIlustration from "../hooks/useAnimatePageIlustration";
import {
   IlustrationWrapper,
   PagesIlustrationWrapper,
} from "../components/ui/PagesIlustrationOnly";
import { useRecoilValue } from "recoil";
import processedComments from "../store/processedComments";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import { MoreDetailBtn } from "../components/ui/Button.styled";
import useMyCustomRouter from "../hooks/useMyCustomRouter";

const PostiveResult: NextPage = () => {
   const myRouter = useMyCustomRouter();
   const pageWrapperEl = useRef<HTMLDivElement>(null);
   const { enterAnimation } = useAnimatePageIlustration();
   const comments = useRecoilValue(processedComments);

   const totalComments =
      comments.positive.length +
      comments.negative.length +
      comments.undefined.length;
   const percen = (comments.positive.length / totalComments) * 100;

   useIsomorphicLayoutEffect(() => {
      enterAnimation(pageWrapperEl);
   }, []);

   const moreDetailHendler = () => {
      myRouter("/result-details", "Generating result details page.");
   };

   return (
      <PagesIlustrationWrapper className="flex-center" ref={pageWrapperEl}>
         <IlustrationWrapper className="ilustration">
            <PositiveIlustration />
         </IlustrationWrapper>
         <p className="ilustration-desc">
            {`Heyy. According to my analysis, ${percen.toFixed(
               2
            )}% of ${totalComments} comments were positive opinion.`}
         </p>
         <div>
            <MoreDetailBtn onClick={moreDetailHendler}>
               More details
            </MoreDetailBtn>
         </div>
      </PagesIlustrationWrapper>
   );
};

export default PostiveResult;
