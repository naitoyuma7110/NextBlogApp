import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    // articleに対して紐づくuserの更新にupdate()を使用している
    // 実際は中間テーブルbookmarkにuserIdとarticleIdを追加する処理となる
    // 以下は、bookmarkにwhre条件(id)に一致するarticleとconnect条件(email)既存userの追加を行っている
    // bookmark.create()でdara{userId:1, articleId:1}などとした方が分かりやすいが記述が長くなる
    const result = await prisma.article.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        isLikedUsers: {
          create: {
            user: {
              connect: { email: session.user.email },
            },
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
