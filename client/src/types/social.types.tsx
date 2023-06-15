type Friends = {
  id: number;
  image: string;
};

type Feeds = {
  id: number;
  nickName: string;
  profile: string;
  tags: string;
  content: string;
};

interface CardDetail {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutsideClicked: (e: any) => void;
  cardId?: number;
  userId?: string;
}
