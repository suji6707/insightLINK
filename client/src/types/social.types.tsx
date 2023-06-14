type Friends = {
  id: number;
  image: string;
};

type Feeds = {
  id: number;
  tags: string;
  content: string;
};

interface CardDetail {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutsideClicked: (e: any) => void;
  cardId?: number;
  userId?: string;
}
