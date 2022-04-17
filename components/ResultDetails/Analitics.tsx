import { gsap } from "gsap";
import { FC, useEffect, useRef } from "react";
import { Card, CardBody, CardTitleWrapper } from "../ui/Card/Card.styled";
import VidioDetails from "../VidioDetails/VidioDetails";
import { AnaliticsCardWrapper, CardWordCloud } from "./Analitics.styled";
import PieChart from "./PieChart";
import { IComment } from "../../server/interfaces/IComment";
import dynamic from "next/dynamic";
const WordCloud = dynamic(() => import("./WordCloud"), { ssr: false });

const Analitics: FC<{
   display: string;
   comments: {
      positive: IComment[];
      negative: IComment[];
      undefined: IComment[];
   };
}> = ({ display, comments }) => {
   const cardWrapper = useRef<HTMLDivElement>(null!);
   const wordCloudWrapper = useRef<HTMLDivElement>(null!);

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
      <AnaliticsCardWrapper
         style={display === "hide" ? { display: "none" } : {}}
         ref={cardWrapper}
      >
         <Card>
            <CardTitleWrapper>
               <h1>Vidio details</h1>
            </CardTitleWrapper>
            <CardBody>
               <VidioDetails />
            </CardBody>
         </Card>

         <PieChart
            positive={comments.positive.length}
            negative={comments.negative.length}
            totalUndefined={comments.undefined.length}
         />

         <CardWordCloud style={{ overflow: "hidden" }}>
            <CardTitleWrapper>
               <h1>Word cloud</h1>
            </CardTitleWrapper>
            <CardBody ref={wordCloudWrapper}>
               <WordCloud />
            </CardBody>
         </CardWordCloud>
      </AnaliticsCardWrapper>
   );
};

export default Analitics;
