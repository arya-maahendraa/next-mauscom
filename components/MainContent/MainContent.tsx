import React, { FC, useEffect } from "react";
import { ContentWrapper, MainContentStyled } from "./MainContent.styled";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { pageIsLoading } from "../../store/page";
import Loading from "../ui/Loading";

const MainContent: FC<{ children: React.ReactNode[] }> = ({ children }) => {
   const router = useRouter();
   const [isLoading, setPageIsLoading] = useRecoilState(pageIsLoading);
   const routerChangeCompleteHandler = () => {
      setPageIsLoading({
         status: false,
         msg: "",
      });
   };
   useEffect(() => {
      router.events.on("routeChangeComplete", routerChangeCompleteHandler);
      return () => {
         router.events.off("routeChangeComplete", routerChangeCompleteHandler);
      };
   }, []);
   return (
      <MainContentStyled className={isLoading.status ? "flex-center" : ""}>
         <ContentWrapper>
            {isLoading.status && <Loading msg={isLoading.msg} />}
            {!isLoading.status && children[0]}
         </ContentWrapper>
         {children[1]}
      </MainContentStyled>
   );
};

export default MainContent;
