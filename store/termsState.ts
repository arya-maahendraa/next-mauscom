import { atom } from "recoil";

const termsState = atom({
   key: "termsState",
   default: [] as string[],
});

export default termsState;
