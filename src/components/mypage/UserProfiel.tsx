import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { User } from '@prisma/client';

type Props = {
  user: User;
};

const UserProfile = (props: Props) => {
  const session = useSession();
  return (
    <div className='w-full bg-white border border-gray-200 rounded-lg shadow '>
      <div className='flex justify-end px-4 pt-4'>
        <button
          id='dropdownButton'
          data-dropdown-toggle='dropdown'
          className='inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5'
          type='button'
        >
          <span className='sr-only'>Open dropdown</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
          </svg>
        </button>
        <div
          id='dropdown'
          className='z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
        >
          <ul className='py-2' aria-labelledby='dropdownButton'>
            <li>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col items-center pb-10'>
        <Image
          src={props.user?.image || '/images/github-icon.png'}
          alt='author'
          width={80}
          height={80}
          className='rounded-full shadow-lg mb-4'
          priority={true}
        />
        <h5 className='mb-1 text-xl font-medium text-gray-700 '>
          {props.user.name}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {props.user.email}
        </span>
        {session.data?.user?.email !== props.user.email && (
          <div className='flex mt-4 space-x-3 md:mt-6'>
            <a
              href='#'
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Add friend
            </a>
            <a
              href='#'
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
            >
              Message
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
