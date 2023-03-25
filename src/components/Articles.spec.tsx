import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Articles from '@/components/Articles';
import { ArticlesProps, testProps } from '@/types/ArticlesProps';

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

// with author isLikedUsers-count
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
        image: '/demo',
        emailVerified: null,
      },
      isLikedUsers: {
        id: 1,
        userId: 1,
        articleId: 1,
        user: [],
      },
    },
    {
      id: 2,
      title: '記事2',
      content: '記事2の内容',
      authorUserId: 2,
      author: {
        id: 2,
        name: '著者A',
        email: 'example@test.com',
        image: '/demo',
        emailVerified: null,
      },
      isLikedUsers: {
        id: 2,
        userId: 2,
        articleId: 2,
        user: [],
      },
    },
  ],
};

describe('propsとして記事に加え,「著者」、「お気に入りユーザー」をコンポーネントに渡す', () => {
  it('全ての記事のtitle,contentが描画される', () => {
    render(<Articles {...allProps} />);
    allProps.articles.forEach((article) => {
      const title = screen.getByText(article.title);
      const content = screen.getByText(article.content);
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  it('描画されたtitleが記事詳細ページへのリンクを持つ', () => {
    render(<Articles {...allProps} />);
    allProps.articles.forEach((article) => {
      const title = screen.getByText(article.title);
      expect(title).toHaveAttribute('href', `/articles/${article.id}`);
    });
  });
  it('全ての著者のイメージアイコンが描画される', () => {
    render(<Articles {...allProps} />);
    const img = screen.getAllByAltText('author');
    expect(img.length).toBe(allProps.articles.length);
  });
  it('全ての著者の名前が描画される', () => {
    render(<Articles {...allProps} />);
    allProps.articles.forEach((article) => {});
  });
});
