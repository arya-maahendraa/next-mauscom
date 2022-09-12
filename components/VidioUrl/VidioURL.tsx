import { VidioURLInput, VidioURLStyled, ProcessBtn } from "./VidioURL.styled";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageIsLoading } from "../../store/page";
import vidioDetailsState from "../../store/vidioDetails";
import { IComment } from "../../server/interfaces/IComment";
import processedComments from "../../store/processedComments";
import { getComments, getVidioDetails } from "../../libs/Youtube";
import { useRouter } from "next/router";
import { useRef } from "react";
import { errorMessageState } from "../../store/errorMessageState";
import termsState from "../../store/termsState";

const VidioURL = () => {
   const [_, setPageIsLoading] = useRecoilState(pageIsLoading);
   const setVidioDetailsState = useSetRecoilState(vidioDetailsState);
   const setTermsState = useSetRecoilState(termsState);
   const setProcessedCommentsState = useSetRecoilState(processedComments);
   const setErrorMessage = useSetRecoilState(errorMessageState);
   const router = useRouter();
   const inputUrl = useRef<HTMLInputElement>(null!);

   const processBtnHandler = async () => {
      const url = inputUrl.current.value;
      if (url === "") return;
      setPageIsLoading({
         status: true,
         msg: "Start getting data.",
      });
      const comments = {
         positive: [] as IComment[],
         negative: [] as IComment[],
         undefined: [] as IComment[],
      };
      const terms = [];
      let page = "/something-broke";
      let nextPageToken = "";

      try {
         setPageIsLoading({
            status: true,
            msg: "Start fetching vidio details.",
         });
         const vidioDetailsData = await getVidioDetails(url);
         setPageIsLoading({
            status: true,
            msg: "Get vidio details successfull.",
         });
         setPageIsLoading({
            status: true,
            msg: "Start fetching comments.",
         });
         do {
            const { newComments, newTerms, newNextPageToken } =
               await getComments(url, nextPageToken);
            terms.push(...newTerms);
            nextPageToken = newNextPageToken;
            comments.positive.push(...newComments.positive);
            comments.negative.push(...newComments.negative);
            comments.undefined.push(...newComments.undefined);
            setPageIsLoading({
               status: true,
               msg: `Successfully geting ${
                  comments.negative.length +
                  comments.positive.length +
                  comments.undefined.length
               } coommetns.`,
            });
         } while (nextPageToken);

         setVidioDetailsState(vidioDetailsData);
         setProcessedCommentsState(comments);
         setTermsState(terms);
         setPageIsLoading({
            status: true,
            msg: `Loading result page.`,
         });
         page =
            comments.positive.length >= comments.negative.length
               ? "/positive-result"
               : "/negative-result";
      } catch (error: any) {
         setErrorMessage({
            status: 0,
            msg: error.response.data.errors.message,
         });
      }
      router.push(page);
   };

   return (
      <VidioURLStyled>
         <VidioURLInput
            type="text"
            placeholder="https://youtube/watch?v=xxxxx"
            defaultValue="https://www.youtube.com/watch?v=Ck4gJyO4GMc"
            ref={inputUrl}
         />
         <ProcessBtn className="flex-center" onClick={processBtnHandler}>
            <ArrowRightIcon style={{ height: "15px", color: "white" }} />
         </ProcessBtn>
      </VidioURLStyled>
   );
};

export default VidioURL;
