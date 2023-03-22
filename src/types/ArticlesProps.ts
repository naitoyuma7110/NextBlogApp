import { Article, Bookmark, User } from '@prisma/client';

export type ArticlesProps = Article & {
  isLikedUsers: Bookmark &
    {
      user: User;
    }[];
  author: User;
};
