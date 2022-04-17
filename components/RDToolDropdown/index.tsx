import { ToolDropdown, ToolDropdownBtn, ToolItem, ToolItems } from "./styled";
import {
   ChartPieIcon,
   DocumentDuplicateIcon,
   DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const RDToolDropdown: FC<{
   changeTool: (tool: "analitics" | "comments") => void;
   activeTool: string;
}> = ({ changeTool, activeTool }) => {
   const [show, setShow] = useState(false);
   const toolItemsEl = useRef<HTMLUListElement>(null!);
   const btn = useRef<HTMLButtonElement>(null!);

   const closeToolItemsHandler = useCallback((e: MouseEvent) => {
      if (
         btn.current === e.target ||
         toolItemsEl.current === e.target ||
         toolItemsEl.current.contains(e.target as Node)
      )
         return;
      toggleToolHandler();
   }, []);

   const toggleToolHandler = () => {
      if (show) {
         gsap.to(toolItemsEl.current, {
            opacity: 0,
            duration: 0.35,
            onComplete: () => {
               setShow((prev) => !prev);
            },
         });
         return;
      }
      window.addEventListener("mousedown", closeToolItemsHandler);
      setShow((prev) => !prev);
   };

   useEffect(() => {
      show && gsap.to(toolItemsEl.current, { opacity: 1, duration: 0.2 });
      !show && window.removeEventListener("mousedown", closeToolItemsHandler);
   }, [show]);

   return (
      <ToolDropdown>
         <ToolDropdownBtn onClick={toggleToolHandler} ref={btn}>
            <span>{activeTool}</span>
            <DotsHorizontalIcon style={{ width: "25px" }} />
         </ToolDropdownBtn>
         {show && (
            <ToolItems ref={toolItemsEl}>
               <ToolItem
                  onClick={() => {
                     toggleToolHandler();
                     changeTool("analitics");
                  }}
               >
                  <ChartPieIcon style={{ width: "20px", marginRight: "1em" }} />
                  analitics
               </ToolItem>
               <ToolItem
                  onClick={() => {
                     toggleToolHandler();
                     changeTool("comments");
                  }}
               >
                  <DocumentDuplicateIcon
                     style={{ width: "20px", marginRight: "1em" }}
                  />
                  commnets
               </ToolItem>
            </ToolItems>
         )}
      </ToolDropdown>
   );
};

export default RDToolDropdown;
