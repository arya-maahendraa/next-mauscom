import { ResultDetailsStyled } from "../components/ResultDetails/ResultDetails.styled";
import RDToolDropdown from "../components/RDToolDropdown";
import { useEffect, useState } from "react";
import Comments from "../components/ResultDetails/Comments";
import processedComments from "../store/processedComments";
import { useRecoilValue } from "recoil";
import Analitics from "../components/ResultDetails/Analitics";

let timer: NodeJS.Timeout;
const ResultDetails = () => {
   const comments = useRecoilValue(processedComments);

   const [activeTool, setActiveTool] = useState<"analitics" | "comments">(
      "analitics"
   );
   const [showTool, setShowTool] = useState(false);

   const changeTool = (tool: "analitics" | "comments") => {
      if (activeTool === tool) return;
      setActiveTool(tool);
   };

   useEffect(() => {
      const rdWindowResizedHandler = () => {
         clearTimeout(timer);
         timer = setTimeout(() => {
            const show = window.innerWidth <= 1200;
            setShowTool(show);
         }, 100);
      };
      
      setShowTool(window.innerWidth <= 1200);
      window.addEventListener("resize", rdWindowResizedHandler);
      return () => {
         window.removeEventListener("resize", rdWindowResizedHandler);
      };
   }, []);

   return (
      <ResultDetailsStyled>
         {showTool && (
            <RDToolDropdown activeTool={activeTool} changeTool={changeTool} />
         )}
         <Analitics
            comments={comments}
            display={activeTool === "analitics" || !showTool ? "" : "hide"}
         />
         <Comments
            comments={comments}
            display={activeTool === "comments" || !showTool ? "" : "hide"}
         />
      </ResultDetailsStyled>
   );
};

export default ResultDetails;
