export type UserT = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  mobile?: string;
  bio?: string | null;
  profileImage: MediaT;
  role: (typeof UserRoles)[keyof typeof UserRoles];
};

export const UserRoles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  ACCOUNTANT: "ACCOUNTANT",
  USER: "USER",
} as const;

export interface UserWithStatsT extends UserT {
  follower_count: number;
  post_count: number;
  following_count: number;
  isFollowing: true;
}

export type MediaT = {
  _id: string;
  name: string;
  key: string;
  url: string;
  type: string;
  uploadedBy: string;
  maskImageUrl: string;
  originalname?: string;
};

export type PostT = {
  _id: string;
  title: string;
  content: string;
  media: MediaT[];
  author: Partial<UserT>;
  location: string;
  isPrivate: boolean;
  createdAt: string;
  isReacted: boolean;
  reaction_count?: number;
  comment_count?: number;
};

export type PriceT = {
  _id: string;
  city: string;
  priceOf: (typeof PRICE_OF)[keyof typeof PRICE_OF];
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export const PRICE_OF = {
  REACTIONS: "REACTIONS",
  VIEWS: "VIEWS",
} as const;
