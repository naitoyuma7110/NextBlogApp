import { GetStaticProps } from 'next';
import Router from 'next/router';
import { ArticlesProps } from '@/types/ArticlesProps';

// Prisma Client をインスタンス化したもの利用して、データベースからデータを取得します
import prisma from '@/lib/prisma';
import Image from 'next/image';

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
              <div className='mt-4 px-4  flex flex-col'>
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
                  <div className='flex-1 min-w-0 '>
                    <p className='text-lg font-medium text-gray-600 truncate '>
                      {article.author?.name}
                    </p>
                    <p className='text-sm text-gray-500 truncate '>
                      {`${article.isLikedUsers?.length} Likes`}
                    </p>
                  </div>
                </div>
                <div className='flex-auto py-3'>
                  <h6
                    className='mb-1 text-xl font-semibold cursor-pointer'
                    onClick={() => Router.push(`/articles/${article.id}`)}
                  >
                    {article.title}
                  </h6>
                  <p className='text-blueGray-500 mb-4 truncate hover:text-clip'>
                    {article.content}
                  </p>
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
      isLikedUsers: true,
    },
  });
  return {
    props: { articles },
  };
};
