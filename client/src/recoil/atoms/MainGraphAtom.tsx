import exp from "constants";
import React from "react";
import { atom } from "recoil";

export const DashBoardCardAtom = atom({
  key: "DashBoardCardAtom",
  default: false,
});

export const ChartInstanceAtom = atom<React.RefObject<echarts.ECharts | null>>({
  key: "chartInstance",
  default: React.createRef<echarts.ECharts | null>(),
});

export const ChartOptionAtom = atom({
  key: "ChartOptionAtom",
  default: null,
});

export const NodeIdAtom = atom<string | null>({
  key: "NodeIdAtom",
  default: null,
});
