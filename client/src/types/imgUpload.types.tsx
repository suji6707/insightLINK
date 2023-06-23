type ImageListProps = {
  imgList: Array<{ name: string; type: string; size: number }>;
  deleteImg: (index: number) => void;
};
