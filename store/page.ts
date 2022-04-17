import { atom } from "recoil";

export const pageIsLoading = atom({
   key: "pageIsLoadingStage",
   default: {
      status: false,
      msg: "",
   },
});
