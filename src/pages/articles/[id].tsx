import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { Article, Bookmark, User } from '@prisma/client';
import Router from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

type ArticleProps = {
  article: Article & {
    author: User;
    isLikedUsers: Bookmark &
      {
        user: User;
      }[];
  };
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
          <div className='flex items-center space-x-4 cursor-pointer'>
            <div className='flex-shrink-0'>
              <Image
                src={props.article.author?.image || '/images/github-icon.png'}
                alt='author'
                width={50}
                height={50}
                className='rounded-full shadow-lg'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <Link
                className='text-lg font-medium text-gray-600'
                href={`/articles/author/${props.article.authorUserId}`}
              >
                {props.article.author?.name || 'No name'}
              </Link>
              <p className='text-sm text-gray-500 truncate '>
                {props.article.author?.email || 'No Publish'}
              </p>
            </div>
          </div>
          <h3 className='my-3 text-3xl font-semibold'>{props.article.title}</h3>
          <p className='text-blueGray-500 mt-4 text-lg leading-relaxed'>
            {props.article.content}
          </p>
          <div className='flex items-center justify-between mt-2 h-10'>
            <div className='flex items-center mb-4'>
              <div className='flex mr-2 -space-x-4'>
                {props.article.isLikedUsers.map((user, i) => {
                  return (
                    <span key={i} className=''>
                      <Image
                        className='border-2 border-white rounded-full'
                        src={user.user.image || '/images/github-icon.png'}
                        width={30}
                        height={30}
                        alt='userIcon'
                      />
                    </span>
                  );
                })}
              </div>

              <div className='text-sm text-gray-400'>
                {`${props.article.isLikedUsers.length} Likes`}
              </div>
            </div>
            {props.isBookmarked ? (
              <button
                type='button'
                className='cursor-pointer rounded bg-blue-400 text-md px-2.5 py-2 text-white dark:bg-blue-200 dark:text-blue-900'
                onClick={() => removeBookmark(props.article.id)}
              >
                いいね済み
              </button>
            ) : (
              <button
                type='button'
                className='cursor-pointer rounded bg-blue-600 text-md px-2.5 py-2 text-white dark:bg-blue-200 dark:text-blue-900'
                onClick={() => addBookmark(props.article.id)}
              >
                いいね
              </button>
            )}
          </div>
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
      author: true,
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
