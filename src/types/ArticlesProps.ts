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
  articles: Array<
    Article & {
      author?: User | undefined;
      isLikedUsers?: Array<
        Bookmark & {
          user?: User | undefined;
        }
      >;
    }
  >;
}
