import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { Article, User } from '@prisma/client';
import Router from 'next/router';
import Image from 'next/image';

type ArticleWithBookmarkUser = Article & {
  isLikedUsers: User[];
};

type ArticleProps = {
  article: ArticleWithBookmarkUser;
  isBookmarked: boolean;
};

async function addBookmark(id: number): Promise<void> {
  await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/bookmark/add/${id}`, {
    method: 'PUT',
  });
  Router.push(`/articles/${id}`);
}

async function removeBookmark(id: number): Promise<void> {
  await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/bookmark/remove/${id}`,
    {
      method: 'PUT',
    }
  );
  Router.push(`/articles/${id}`);
}

const Article = (props: ArticleProps) => {
  return (
    <div className='container mx-auto'>
      <div className='my-12 flex justify-center p-12'>
        <div className='ml-auto mr-auto w-full lg:w-8/12'>
          <Image
            src='/images/github-icon.png'
            alt='author'
            width={60}
            height={60}
          />
          <h3 className='my-3 text-3xl font-semibold'>{props.article.title}</h3>
          <p className='text-blueGray-500 mt-4 text-lg leading-relaxed'>
            {props.article.content}
          </p>
          {props.isBookmarked ? (
            // ブックマーク済：ログイン中のユーザーがブックマークユーザーに含まれる
            <button
              type='button'
              className='mt-5 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
              onClick={() => removeBookmark(props.article.id)}
            >
              Remove Bookmark
              <span className='ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-200 text-xs font-semibold text-red-800'>
                {props.article.isLikedUsers.length}
              </span>
            </button>
          ) : (
            <button
              type='button'
              className='mt-5 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={() => addBookmark(props.article.id)}
            >
              Bookmark this article
              <span className='ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800'>
                {props.article.isLikedUsers.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  res,
}) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 401;
    return { props: { article: null } };
  }
  const article = await prisma.article.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      isLikedUsers: {
        include: {
          user: true,
        },
      },
    },
  });

  const isBookmarked =
    article &&
    article.isLikedUsers.some(
      (bookmark) => bookmark.user?.email === session.user?.email
    );
  return {
    props: { article, isBookmarked },
  };
};
