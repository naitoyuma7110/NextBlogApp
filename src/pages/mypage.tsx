import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { ArticlesProps } from '@/types/ArticlesProps';
import Router from 'next/router';
import Link from 'next/link';

import MypageBookmarkedArticles from '@/components/mypage/MypageBookmarkedArticles';
import MypageMypostArticles from '@/components/mypage/MypageMypostArticles';

type Props = {
  bookmarkedArticle: ArticlesProps[];
  myPostArticle: ArticlesProps[];
};

const Mypage = (props: Props) => {
  return (
    <>
      <p>Mypage</p>
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
    },
  });
  const bookmarkedArticle = JSON.parse(JSON.stringify(bookmarkedData));

  // console.log(bookmarkedArticle[0].isLikedUsers);

  const sessionUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  const userId = sessionUser?.id;
  const myPostArticleData = await prisma.article.findMany({
    where: {
      authorUserId: userId,
    },
    include: {
      isLikedUsers: {
        include: {
          user: true,
        },
      },
    },
  });
  const myPostArticle = JSON.parse(JSON.stringify(myPostArticleData));

  console.log(myPostArticle[0]);

  return {
    props: {
      bookmarkedArticle,
      myPostArticle,
    },
  };
};
