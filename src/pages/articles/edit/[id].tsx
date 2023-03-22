import prisma from '@/lib/prisma';
import { ArticlesProps } from '@/types/ArticlesProps';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Router from 'next/router';
import { ReactElement, useState } from 'react';

type Props = {
  article: ArticlesProps;
};

const Edit = (props: Props) => {
  const [title, setTitle] = useState(props.article.title);
  const [content, setContent] = useState(props.article.content);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const updateArticle = async (id: number): Promise<void> => {
    await fetch(
      process.env.NEXT_PUBLIC_VERCEL_URL + `/api/article/update/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );
    Router.push(`/articles`);
  };

  const deleteArticle = async (id: number): Promise<void> => {
    if (confirm('この記事を削除しますか？')) {
      await fetch(
        process.env.NEXT_PUBLIC_VERCEL_URL + `/api/article/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      Router.push(`/articles`);
    } else {
      return;
    }
  };

  return (
    <div className='m-20'>
      <form>
        <div className='mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>
            Title
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='title'
            required
            value={title}
            onChange={(e) => handleChangeTitle(e)}
          />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900'>
            Contet
          </label>
          <textarea
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='content'
            required
            rows={8}
            value={content}
            onChange={(e) => handleChangeContent(e)}
          />
        </div>
        <div className='flex items-start'>
          <button
            type='button'
            className='mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={(e) => {
              e.preventDefault();
              updateArticle(props.article.id);
            }}
          >
            UPDATE
          </button>
          <button
            type='button'
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            onClick={(e) => {
              e.preventDefault();
              deleteArticle(props.article.id);
            }}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

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
  });

  return {
    props: { article },
  };
};
