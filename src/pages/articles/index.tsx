import { GetStaticProps } from 'next';
import Router from 'next/router';
import { ArticlesProps } from '@/types/ArticlesProps';

// Prisma Client をインスタンス化したもの利用して、データベースからデータを取得します
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  articles: ArticlesProps[];
};

const Articles = (props: Props) => {
  return (
    <div className='container mx-auto'>
      <div className='mt-10 w-full px-8'>
        <div className='flex flex-wrap'>
          {props.articles.map((article) => (
            <div key={article.id} className='w-full px-2 lg:w-4/12'>
              <div className='mt-4 px-4 flex flex-col'>
                <div className='flex items-center space-x-4 cursor-pointer'>
                  <div className='flex-shrink-0'>
                    <Image
                      src={article.author?.image || '/images/github-icon.png'}
                      alt='author'
                      width={50}
                      height={50}
                      className='rounded-full shadow-lg'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <Link
                      className='text-lg font-medium text-gray-600'
                      href={`/articles/author/${article.authorUserId}`}
                    >
                      {article.author?.name || 'No name'}
                    </Link>
                    <p className='text-sm text-gray-500 truncate '>
                      {article.author?.email || 'No Publish'}
                    </p>
                  </div>
                </div>
                <div className='flex-auto pt-3'>
                  <h6
                    className='mb-1 text-xl font-semibold cursor-pointer'
                    onClick={() => Router.push(`/articles/${article.id}`)}
                  >
                    {article.title}
                  </h6>
                  <p className='text-blueGray-500 mb-4 line-clamp-3 hover:text-clip'>
                    {article.content}
                  </p>
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

export default Articles;

// GetStaticProps:サーバーサイドでbuild時のみ実行(Clientに公開されない)
export const getStaticProps: GetStaticProps = async () => {
  const articles = await prisma.article.findMany({
    include: {
      author: true,
      isLikedUsers: {
        include: {
          user: true,
        },
      },
    },
  });
  return {
    props: { articles },
  };
};
