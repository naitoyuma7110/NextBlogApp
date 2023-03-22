import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { ArticlesProps } from '@/types/ArticlesProps';

import MypageBookmarkedArticles from '@/components/mypage/MypageBookmarkedArticles';
import MypageMypostArticles from '@/components/mypage/MypageMypostArticles';
import UserProfile from '../components/mypage/UserProfiel';
import { User } from '@prisma/client';

type Props = {
  bookmarkedArticles: ArticlesProps[];
  myPostArticles: ArticlesProps[];
  user: User;
};

const Mypage = (props: Props) => {
  return (
    <>
      <UserProfile {...props}></UserProfile>
      <MypageMypostArticles {...props}></MypageMypostArticles>
      <MypageBookmarkedArticles {...props}></MypageBookmarkedArticles>
    </>
  );
};

export default Mypage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 401;
    return { props: { articles: null } };
  }

  const bookmarkedData = await prisma.article.findMany({
    where: {
      isLikedUsers: {
        some: {
          user: {
            email: session.user?.email as string,
          },
        },
      },
    },
    include: {
      isLikedUsers: {
        include: {
          user: true,
        },
      },
      author: true,
    },
  });
  const bookmarkedArticles = JSON.parse(JSON.stringify(bookmarkedData));

  // console.log(bookmarkedArticle[0].isLikedUsers);

  const loginUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  const myPostArticleData = await prisma.article.findMany({
    where: {
      authorUserId: loginUser?.id,
    },
    include: {
      isLikedUsers: {
        include: {
          user: true,
        },
      },
      author: true,
    },
  });
  const myPostArticles = JSON.parse(JSON.stringify(myPostArticleData));

  return {
    props: {
      bookmarkedArticles,
      myPostArticles,
      user: loginUser,
    },
  };
};
