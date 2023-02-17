export type Card = {
  card_type: string;
  card_code: string;
  img_url: string;
  card_name: string;
};

export type WishListCard = {
  card_img_url: string;
  card_name: string;
  quantity: number;
};

export type CardType = {
  type_name: string;
  cards: Card[];
};

export type Expansion = {
  expansion_url: string;
  expansion_full_name: string;
  card_types: CardType[];
};

export type ExpansionInitialState = {
  expansions: Expansion[];
  currentExpansion: Expansion;
};

export type ExpansionParams = {
  name: string;
};

export type WishListParams = {
  name: string;
};

export type WishList = {
  wish_list_name: string;
  cards: WishListCard[];
};

export type WishListInitialState = {
  wishLists: WishList[];
  currentWishList: WishList;
};

export type CardsInitialState = {
  currentCard: Card;
};
