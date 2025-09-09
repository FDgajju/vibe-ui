export type UserT = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  bio?: string | null;
  profileImage: MediaT;
};

export type MediaT = {
  _id: string;
  name: string;
  key: string;
  url: string;
  type: string;
  uploadedBy: string;
  maskImageUrl: string;
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
  likes?: number 
  comments?: number 
};
