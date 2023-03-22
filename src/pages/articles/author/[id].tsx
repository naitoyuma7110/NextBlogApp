import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import UserProfile from '@/components/mypage/UserProfiel';
import MypageMypostArticles from '@/components/mypage/MypageMypostArticles';
import { ArticlesProps } from '@/types/ArticlesProps';
import ArticlesAuthorPost from '@/components/articles/ArticlesAuthorPost';

type Props = {
  articles: ArticlesProps[];
  user: User;
  loginUser: User;
};

const Author = (props: Props) => {
  return (
    <>
      <UserProfile {...props}></UserProfile>
      <ArticlesAuthorPost {...props}></ArticlesAuthorPost>
    </>
  );
};

export default Author;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  res,
}) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 401;
    return { props: { articles: null } };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  const loginUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const articlesData = await prisma.article.findMany({
    where: {
      authorUserId: Number(params?.id),
    },
    include: {
      isLikedUsers: {
        include: {
          user: true,
        },
      },
    },
  });
  const articles = JSON.parse(JSON.stringify(articlesData));

  return {
    props: {
      user,
      articles,
      loginUser,
    },
  };
};
