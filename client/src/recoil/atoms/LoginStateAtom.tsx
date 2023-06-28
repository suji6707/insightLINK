import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginStateAtom = atom({
  key: "LoginStateAtom",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
