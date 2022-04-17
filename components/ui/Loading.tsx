import gsap from "gsap";
import { FC } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { LoadingStyled, MSGStyled } from "./Loading.styled";

const Loading: FC<{ msg?: string; width?: number; height?: number }> = ({
   msg = "loading...",
   height = 75,
   width = 75,
}) => {
   useIsomorphicLayoutEffect(() => {
      gsap.from("#loading-wave", { opacity: 0, duration: 1.5 });
   }, []);
   return (
      <div
         id="loading-wave"
         className="flex-center"
         style={{ flexDirection: "column" }}
      >
         <LoadingStyled height={height} width={width} />
         <MSGStyled>{msg}</MSGStyled>
      </div>
   );
};

export default Loading;
