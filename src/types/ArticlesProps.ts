import { Article, Bookmark, User } from '@prisma/client';

export type ArticlesProps = Article & {
  isLikedUsers: Bookmark &
    {
      user: User;
    }[];
  author?: User;
};

// 記事情報
export interface testProps {
  articles: (Article & {
    author?: User | null;
    isLikedUsers?: Bookmark &
      {
        user?: User;
      }[];
  })[];
}
