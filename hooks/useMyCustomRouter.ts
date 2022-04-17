import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { pageIsLoading } from "../store/page";

const useMyCustomRouter = () => {
   const route = useRouter();
   const setPageIsLoading = useSetRecoilState(pageIsLoading);

   const myRouter = (url: string, loadingMsg = "Page is loading") => {
      setPageIsLoading({
         status: true,
         msg: loadingMsg,
      });
      route.push(url);
   };

   return myRouter;
};

export default useMyCustomRouter;
