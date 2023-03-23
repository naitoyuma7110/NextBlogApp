import { ArticlesProps } from '@/types/ArticlesProps';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type Props = {
  myPostArticles: ArticlesProps[];
};

const MypageMypostArticles = (props: Props) => {
  const [isNewPost, setIsnewPost] = useState(false);
  const [editState, setEditState] = useState({
    isEdit: false,
    target: 0,
  });

  const [newPostFiledTitle, setNewPostFieldTitle] = useState('');
  const [newPostFiledContent, setNewPostContent] = useState('');

  const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPostFieldTitle(e.target.value);
  };

  const inputContentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostContent(e.target.value);
  };

  async function addArticle(): Promise<void> {
    await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/article/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newPostFiledTitle,
        content: newPostFiledContent,
      }),
    });
    setNewPostFieldTitle('');
    setNewPostContent('');
    setIsnewPost(false);
    Router.push(`/mypage`);
  }

  const updateArticle = async (id: number): Promise<void> => {
    await fetch(
      process.env.NEXT_PUBLIC_VERCEL_URL + `/api/article/update/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostFiledTitle,
          content: newPostFiledContent,
        }),
      }
    );
    setNewPostFieldTitle('');
    setNewPostContent('');
    setEditState({ ...editState, isEdit: false });
    Router.push(`/mypage`);
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
      Router.push(`/mypage`);
    } else {
      return;
    }
    setNewPostFieldTitle('');
    setNewPostContent('');
    setEditState({ ...editState, isEdit: false });
  };

  return (
    <div className='container mx-auto px-6 py-16'>
      <div className='mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]'>
        <div className='overflow-x-auto'>
          <h1 className='mb-8 text-center text-3xl'>All articles you post</h1>
          <div className='text-center my-5'>
            <button
              onClick={() => {
                setIsnewPost(!isNewPost);
                setEditState({ ...editState, isEdit: false });
              }}
            >
              <span className='group mt-5 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'>
                <span className='rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                  {isNewPost ? 'Cancel' : 'New Post'}
                </span>
              </span>
            </button>
          </div>
          {isNewPost && (
            <div className='p-1 my-4'>
              <input
                className='text-xl w-full mb-4 font-semibold text-gray-700'
                placeholder='HELLO'
                onChange={(e) => {
                  inputTitleHandler(e);
                }}
              />
              <textarea
                className='text-blueGray-500 line-clamp-3 w-full mb-4'
                placeholder='HELLO'
                rows={4}
                onChange={(e) => {
                  inputContentHandler(e);
                }}
              />
              <div className='text-end font-medium mx-2 mb-4'>
                <span
                  className='cursor-pointer rounded bg-blue-100 text-md px-2.5 py-2 text-blue-800 dark:bg-blue-200 dark:text-blue-900'
                  onClick={() => {
                    addArticle();
                  }}
                >
                  投稿
                </span>
              </div>
            </div>
          )}
          {props.myPostArticles.map((article) => (
            <div key={article.id}>
              {editState.isEdit && article.id === editState.target ? (
                <div className='p-2 my-4'>
                  <input
                    className='text-xl w-full mb-4 font-semibold text-gray-700'
                    placeholder='HELLO'
                    value={newPostFiledTitle}
                    onChange={(e) => {
                      inputTitleHandler(e);
                    }}
                  />
                  <textarea
                    className='text-blueGray-500 line-clamp-3 w-full mb-4'
                    placeholder='HELLO'
                    rows={4}
                    value={newPostFiledContent}
                    onChange={(e) => {
                      inputContentHandler(e);
                    }}
                  />
                  <div className='flex justify-end'>
                    <div className='text-end font-medium my-4 mx-1'>
                      <span
                        className='cursor-pointer rounded bg-red-100 text-md px-2.5 py-2 text-red-800 dark:bg-red-200 dark:text-red-900'
                        onClick={() => {
                          deleteArticle(article.id);
                        }}
                      >
                        削除
                      </span>
                    </div>
                    <div className='text-end font-medium my-4 mx-1'>
                      <span
                        className='cursor-pointer rounded bg-blue-100 text-md px-2.5 py-2 text-blue-800 dark:bg-blue-200 dark:text-blue-900'
                        onClick={() => {
                          updateArticle(article.id);
                        }}
                      >
                        更新
                      </span>
                    </div>
                    <div className='text-end font-medium my-4 mx-1'>
                      <span
                        className='cursor-pointer rounded bg-gray-100 text-md px-2.5 py-2 text-gray-800 dark:bg-gray-200 dark:text-gray-900'
                        onClick={() => {
                          setEditState({ ...editState, isEdit: false });
                        }}
                      >
                        キャンセル
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='p-2 my-4 hover:bg-gray-100'>
                  <div
                    onClick={() => Router.push(`/articles/${article.id}`)}
                    className='cursor-pointer text-xl mb-2 font-semibold text-gray-700'
                  >
                    {article.title}
                  </div>
                  <div className='text-gray-400 line-clamp-3 hover:text-clip mb-2'>
                    {article.content}
                  </div>
                  <div className='flex justify-between'>
                    <div className='font-medium text-gray-400'>
                      {article.isLikedUsers.length > 1 ||
                      article.isLikedUsers.length === 0
                        ? `${article.isLikedUsers.length} Likes `
                        : `${article.isLikedUsers.length} Like `}
                      {article.isLikedUsers && (
                        <div className='flex mb-2 space-x-4'>
                          {article.isLikedUsers.map((user, i) => {
                            return (
                              <span key={i} className='mt-1'>
                                <Image
                                  className='border-2 border-white rounded-full'
                                  src={
                                    user.user.image || '/images/github-icon.png'
                                  }
                                  width={30}
                                  height={30}
                                  alt='userIcon'
                                />
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='text-end font-medium mx-2 mb-4'>
                    <span
                      className='cursor-pointer rounded bg-green-100 text-md px-2.5 py-2 text-green-800 dark:bg-green-200 dark:text-green-900'
                      onClick={() => {
                        setEditState({
                          isEdit: true,
                          target: article.id,
                        });
                        setIsnewPost(false);
                        setNewPostFieldTitle(article.title);
                        setNewPostContent(article.content);
                      }}
                    >
                      編集
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MypageMypostArticles;
