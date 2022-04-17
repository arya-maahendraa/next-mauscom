import { atom } from "recoil";
import { IComment } from "../server/interfaces/IComment";

const processedComments = atom({
   key: "processedCommentsState",
   default: {
      positive: [] as IComment[],
      negative: [] as IComment[],
      undefined: [] as IComment[],
   },
});

export default processedComments;
