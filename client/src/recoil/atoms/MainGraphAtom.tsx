import exp from "constants";
import { atom } from "recoil";

export const DashBoardCardAtom = atom({
  key: "DashBoardCardAtom",
  default: false,
});

export const ChartInstanceAtom = atom({
  key: "ChartInstanceAtom",
  default: null,
});

export const ChartOptionAtom = atom({
  key: "ChartOptionAtom",
  default: null,
});

export const NodeIdAtom = atom({
  key: "NodeIdAtom",
  default: null,
});
