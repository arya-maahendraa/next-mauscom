import { NextPage } from "next";
import { useRef } from "react";
import useAnimatePageIlustration from "../hooks/useAnimatePageIlustration";
import {
   IlustrationWrapper,
   PagesIlustrationWrapper,
} from "../components/ui/PagesIlustrationOnly";
import NotFoundIlustration from "../components/ilustration/NotFoundIlustration";
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
            <NotFoundIlustration />
         </IlustrationWrapper>
         <p className="ilustration-desc">Page not found.</p>
      </PagesIlustrationWrapper>
   );
};

export default Error;
