type Friends = {
  cardId: number;
  userId: number;
  userName: string;
  profile_img: string;
};

type Cards = {
  cardId: number;
  content: string;
  img: string;
  tag: string;
  userId: number;
  userName: string;
};

interface CardDetail {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutsideClicked: (e: any) => void;
  cardId?: number;
  userId?: string;
}
