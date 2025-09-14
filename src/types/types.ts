export type UserT = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  bio?: string | null;
  profileImage: MediaT;
};

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
  author: UserT;
  location: string;
  isPrivate: boolean;
  createdAt: string;
  isReacted: boolean;
  reaction_count?: number;
  comment_count?: number;
};
