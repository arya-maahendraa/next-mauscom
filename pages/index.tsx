import { NextPage } from "next";
import { useRef } from "react";
import { HomeILustration } from "../components/ilustration/HomeILustration";
import {
   IlustrationWrapper,
   PagesIlustrationWrapper,
} from "../components/ui/PagesIlustrationOnly";
import useAnimatePageIlustration from "../hooks/useAnimatePageIlustration";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

const Home: NextPage = () => {
   const pageWrapperEl = useRef<HTMLDivElement>(null);
   const { enterAnimation } = useAnimatePageIlustration();
   useIsomorphicLayoutEffect(() => {
      enterAnimation(pageWrapperEl);
   }, []);

   return (
      <PagesIlustrationWrapper className="flex-center" ref={pageWrapperEl}>
         <IlustrationWrapper className="ilustration">
            <HomeILustration />
         </IlustrationWrapper>
         <p className="ilustration-desc">
            copy and paste your youtube video URL or vidio id to the text input
            above to start sentiment extraction process.
         </p>
      </PagesIlustrationWrapper>
   );
};

export default Home;
