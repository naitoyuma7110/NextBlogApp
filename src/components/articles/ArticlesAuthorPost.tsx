import { ArticlesProps } from '@/types/ArticlesProps';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '@prisma/client';

type Props = {
  articles: ArticlesProps[];
  user: User;
};

const ArticlesAuthorPost = (props: Props) => {
  return (
    <div className='container mx-auto px-6 py-16'>
      <div className='mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]'>
        <div className='overflow-x-auto'>
          <h1 className='mb-8 text-center text-3xl'>All articles</h1>

          {props.articles.map((article) => (
            <div key={article.id}>
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
                <div className='flex items-center mb-4'>
                  <div className='flex mr-2 -space-x-4'>
                    {article.isLikedUsers.map((user, i) => {
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
                    {`${article.isLikedUsers.length} Likes`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesAuthorPost;
