import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  // session情報の取得
  const { data: session, status } = useSession();
  return (
    <>
      <div className='bg-gray-900'>
        <div className='container mx-auto flex max-w-4xl items-center px-2 py-7'>
          <div className='mx-auto flex w-full flex-wrap items-center'>
            <div className='flex w-full justify-center font-extrabold text-white lg:w-1/2 lg:justify-start'>
              <Link href='/'>
                <span className='text-2xl text-gray-900 no-underline hover:text-gray-900 hover:no-underline'>
                  <span className=' text-gray-200'>BOOK-APP</span>
                </span>
              </Link>
            </div>
            <div className='flex w-full content-center justify-between pt-2 lg:w-1/2 lg:justify-end lg:pt-0'>
              <ul className='list-reset flex flex-1 items-center justify-center lg:flex-none'>
                <li className='py-1 px-4 text-white no-underline'>
                  <Link href='/articles'>
                    <span>Articles</span>
                  </Link>
                </li>
                {status !== 'loading' && session && (
                  <>
                    <li className='py-1 px-4 text-white no-underline'>
                      <Link href='/mypage'>
                        <span>MyPage</span>
                      </Link>
                    </li>
                    <li className='py-1 px-4 text-white no-underline'>
                      <button onClick={() => signOut()}>
                        <span>Log out</span>
                      </button>
                    </li>
                  </>
                )}
                {status !== 'loading' && !session && (
                  <li className='py-1 px-4 text-white no-underline'>
                    <button onClick={() => signIn()}>
                      <span>Log in</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
