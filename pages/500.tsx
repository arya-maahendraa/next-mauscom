import { NextPage } from "next";
import { useRef } from "react";
import useAnimatePageIlustration from "../hooks/useAnimatePageIlustration";
import {
   IlustrationWrapper,
   PagesIlustrationWrapper,
} from "../components/ui/PagesIlustrationOnly";
import ServerDownIlustration from "../components/ilustration/ServerDownIlustration";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

const Error: NextPage = () => {
   const pageWrapperEl = useRef<HTMLDivElement>(null);
   const { enterAnimation } = useAnimatePageIlustration();

   useIsomorphicLayoutEffect(() => {
      enterAnimation(pageWrapperEl);
   }, []);

   return (
      <PagesIlustrationWrapper className="flex-center" ref={pageWrapperEl}>
         <IlustrationWrapper className="ilustration">
            <ServerDownIlustration />
         </IlustrationWrapper>
         <p className="ilustration-desc">sorry!, server down.</p>
      </PagesIlustrationWrapper>
   );
};

export default Error;
