import { atom } from "recoil";

export const errorMessageState = atom({
   key: "errorMessageState",
   default: {
      status: 200,
      msg: "sorry!, something broke.",
   },
});
