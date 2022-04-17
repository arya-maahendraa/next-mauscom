import { useRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { generateWordCloudData } from "../../libs/wordCloud";
import termsState from "../../store/termsState";
import cloud from "../../libs/d3.layout.cloud";
import * as d3 from "d3";

let timer: NodeJS.Timeout;
const WordCloud = () => {
   const cloudContainer = useRef<HTMLDivElement>(null!);
   const commentsTerms = useRecoilValue(termsState);
   const [cloudContainerSize, setcloudContainerSize] = useState({
      width: 0,
      height: 0,
   });

   useEffect(() => {
      const rdWindowResizedHandler = () => {
         clearTimeout(timer);
         timer = setTimeout(() => {
            setcloudContainerSize({
               width: cloudContainer.current.getBoundingClientRect().width,
               height: cloudContainer.current.getBoundingClientRect().width,
            });
         }, 100);
      };

      setcloudContainerSize({
         width: cloudContainer.current.getBoundingClientRect().width,
         height: cloudContainer.current.getBoundingClientRect().width,
      });
      window.addEventListener("resize", rdWindowResizedHandler);
      return () => {
         window.removeEventListener("resize", rdWindowResizedHandler);
      };
   }, []);

   useEffect(() => {
      cloudContainer.current.innerHTML = "";
      const data = generateWordCloudData(commentsTerms);

      const end = (words: any) => {
         d3.select(cloudContainer.current)
            .append("svg")
            .attr("width", cloudContainerSize.width)
            .attr("height", cloudContainerSize.height)
            .append("g")
            .attr(
               "transform",
               "translate(" +
                  cloudContainerSize.width / 2 +
                  "," +
                  cloudContainerSize.height / 2 +
                  ")"
            )
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", (d: any) => {
               return d.size + "px";
            })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("fill", () => {
               return "#" + Math.floor(Math.random() * 16777215).toString(16);
            })
            .attr("transform", (d: any) => {
               return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text((d: any) => {
               return d.text;
            });
      };

      cloud()
         .size([cloudContainerSize.width, cloudContainerSize.height])
         .words(data)
         .padding(2)
         .rotate(() => {
            return ~~(Math.random() * 2) * 90;
         })
         .font("Impact")
         .fontSize((d: any) => {
            return d.size * 0.9;
         })
         .on("end", end)
         .start();
   }, [cloudContainerSize]);
   return <div style={{ width: "100%" }} ref={cloudContainer}></div>;
};

export default WordCloud;
