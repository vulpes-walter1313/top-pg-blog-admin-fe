export type PostType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  _count: {
    comments: number;
  };
};
