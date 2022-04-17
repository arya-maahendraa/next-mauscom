import { useCallback, useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import data from "./ResultDetails/data.json";
import Loading from "./ui/Loading";

const WC = () => {
   const [isLoading, setIsLoading] = useState(false);
   const fontSize = useCallback((word: any) => Math.log2(word.value) * 5, []);

   useEffect(() => {
      setIsLoading(true);
   }, []);

   if (!isLoading) return <Loading width={45} height={45} />;
   return <WordCloud data={data} spiral="rectangular" fontSize={fontSize} />;
};
export default WC;
