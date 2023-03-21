import { Article, User } from '@prisma/client';

export type ArticlesProps = Article & {
  isLikedUsers: User[];
  author: User;
};
