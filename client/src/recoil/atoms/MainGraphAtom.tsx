import React from "react";
import { atom } from "recoil";
import { CardData_DTO, CardDetail_DTO } from "@/types/dashborad.types";
import CardDetail from '../../features/Social/components/CardDetail';

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

export const CardDataAtom = atom<CardData_DTO | null>({
  key: "CardDataAtom",
  default: null,
});

export const CardDetailAtom = atom<CardDetail_DTO | null>({
  key: "CardDetailAtom",
  default: null,
});

export const CardDetailOpenAtom = atom({
  key: "CardDetailOpenAtom",
  default: false,
});

export const ClickedCardDetailAtom = atom<number | null>({
  key: "ClickedCardDetailAtom",
  default: null,
});
