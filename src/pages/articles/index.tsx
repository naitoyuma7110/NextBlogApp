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
            <div
              key={article.id}
              className='w-full cursor-pointer px-2 lg:w-4/12'
              onClick={() => Router.push(`/articles/${article.id}`)}
            >
              <div className='mt-4 px-4  flex flex-col'>
                <Image
                  src='/images/github-icon.png'
                  alt='author'
                  width={40}
                  height={40}
                />
                <div className='flex-auto py-3'>
                  <h6 className='mb-1 text-xl font-semibold'>
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
  const articles = await prisma.article.findMany();
  return {
    props: { articles },
  };
};
