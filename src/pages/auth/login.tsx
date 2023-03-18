import { getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

interface BtnClass {
  [key: string]: string;
}

const login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='flex flex-col items-center space-y-20 pt-40'>
      <Image
        src='/images/github-icon.png'
        alt='github'
        width={150}
        height={150}
      />
      <div className='text-center '>
        <div className='mx-auto max-w-3xl'>
          <div className='flexjustify-center'>
            {providers &&
              Object.values(providers).map((provider) => {
                const btnClass: BtnClass = {
                  GitHub:
                    'text-white focus:outline-none  bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
                  Google:
                    'text-white focus:outline-none  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
                };
                return (
                  <div key={provider.name}>
                    <button
                      className='group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white'
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: '/',
                        })
                      }
                    >
                      <span className={btnClass[provider.name]}>
                        Sign in with {provider.name}
                      </span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

export const getServerSideProps = async () => {
  // 認証方法の設定
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
