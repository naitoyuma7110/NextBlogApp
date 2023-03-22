import { ArticlesProps } from '@/types/ArticlesProps';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  bookmarkedArticles: ArticlesProps[];
};

async function removeBookmark(id: number): Promise<void> {
  await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/bookmark/remove/${id}`,
    {
      method: 'PUT',
    }
  );
  // TODO:ページ遷移による画面更新を変更できないものか…
  Router.push('/mypage');
}

const MypageBookmarkedArticles = (props: Props) => {
  console.log(props);
  return (
    <div className='container mx-auto px-6 py-16'>
      {props.bookmarkedArticles.length > 0 ? (
        <div className='mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]'>
          <div className='overflow-x-auto'>
            <h1 className='mb-8 text-center text-3xl'>
              All articles you bookmarked
            </h1>
            <table className='w-full table-auto'>
              <tbody className='divide-y divide-slate-100 text-sm font-medium'>
                {props.bookmarkedArticles.map((article) => (
                  <tr
                    key={article.id}
                    className='group transition-colors hover:bg-gray-100'
                  >
                    <td>
                      <Image
                        src={article.author?.image || '/images/github-icon.png'}
                        alt='author'
                        width={40}
                        height={40}
                        className='rounded-full shadow-lg'
                      />
                    </td>
                    <td className='py-4 pl-4'>
                      <div>
                        <p
                          onClick={() => Router.push(`/articles/${article.id}`)}
                          className='cursor-pointer text-lg font-semibold text-gray-700'
                        >
                          {article.title}
                        </p>
                        <div className='font-medium text-gray-400'>
                          {article.isLikedUsers.length > 1
                            ? `${article.isLikedUsers.length} users `
                            : `${article.isLikedUsers.length} user `}
                          bookmarked this article
                        </div>
                      </div>
                    </td>
                    <td className='text-center font-medium'>
                      <span
                        className='mr-2 cursor-pointer rounded bg-red-100 px-2.5 text-md px-2.5 py-2 text-red-800 dark:bg-red-200 dark:text-red-900'
                        onClick={() => removeBookmark(article.id)}
                      >
                        いいね解除
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <h1 className='text-3xl'>No articles bookmarked</h1>
          <Link href='/articles'>
            <span className='group mt-5 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'>
              <span className='rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Find Articles
              </span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MypageBookmarkedArticles;
