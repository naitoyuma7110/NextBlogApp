import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const CookieLogin = () => {
  const router = useRouter();

  //ログイン処理（CookieにsignedIn=trueとする）
  const login = () => {
    Cookies.set('signedIn', 'OK');
    router.replace('/');
  };

  return (
    <>
      <button
        className='group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white'
        onClick={() => login()}
      >
        <span className='text-white focus:outline-none  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
          Sign in with Cookie
        </span>
      </button>
    </>
  );
};

export default CookieLogin;
