import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Article, Bookmark, User } from '@prisma/client';
import Articles from '@/components/Articles';
import { GetStaticProps } from 'next';
import Router from 'next/router';
import { ArticlesProps, testProps } from '@/types/ArticlesProps';

// Prisma Client をインスタンス化したもの利用して、データベースからデータを取得します
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

const ArticleWithLikesProps: testProps = {
  articles: [
    {
      id: 1,
      title: '記事1',
      content: '記事1の内容',
      authorUserId: 1,
      isLikedUsers: {
        id: 1,
        userId: 1,
        articleId: 1,
      },
    },
  ],
};

const allProps: testProps = {
  articles: [
    {
      id: 1,
      title: '記事1',
      content: '記事1の内容',
      authorUserId: 1,
      author: {
        id: 1,
        name: '著者A',
        email: 'example@test.com',
        image: 'demo',
        emailVerified: null,
      },
      isLikedUsers: {
        id: 1,
        userId: 1,
        articleId: 1,
        user: [],
      },
    },
  ],
};

describe('propsとしてarticlesとisLikedUsersのみコンポーネントに渡す', () => {
  const { container } = render(<Articles {...allProps} />);
  it('全ての記事のtitle,contentが描画される', () => {
    allProps.articles.forEach((article) => {
      const title = screen.getByText(article.title);
      const content = screen.getByText(article.content);
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  it('Authorのimage-iconが全て描画される', () => {
    const image = container.querySelector('Image');
    expect(image).toBeInTheDocument();
  });
  it('authorが渡されると名前が描画されLinkが設置される', () => {});
});
