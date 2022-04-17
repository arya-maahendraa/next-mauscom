import { NextPage } from "next";
import { useLayoutEffect, useRef } from "react";
import useAnimatePageIlustration from "../hooks/useAnimatePageIlustration";
import ErrorIlustration from "../components/ilustration/ErrorIlustration";
import {
   IlustrationWrapper,
   PagesIlustrationWrapper,
} from "../components/ui/PagesIlustrationOnly";
import { useRecoilState } from "recoil";
import { errorMessageState } from "../store/errorMessageState";

const SomethingBroke: NextPage = () => {
   const pageWrapperEl = useRef<HTMLDivElement>(null);
   const { enterAnimation } = useAnimatePageIlustration();
   const [errMsg, setErrMsg] = useRecoilState(errorMessageState);

   useLayoutEffect(() => {
      enterAnimation(pageWrapperEl);
      return () => {
         setErrMsg({
            status: 200,
            msg: "sorry!, something broke.",
         });
      };
   });

   return (
      <PagesIlustrationWrapper className="flex-center" ref={pageWrapperEl}>
         <IlustrationWrapper className="ilustration">
            <ErrorIlustration />
         </IlustrationWrapper>
         <p className="ilustration-desc">{errMsg.msg}</p>
      </PagesIlustrationWrapper>
   );
};

export default SomethingBroke;
