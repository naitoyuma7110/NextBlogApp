import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    // email一致条件でdisconenctができなかった
    // ログインユーザーIDを別途取得してからid指定で連携を解除する
    // userIdとarticleIdでdelete()が実行できなかったのはuniqueが保障されていなため
    // deleteManyで複数一致を許容すれば実行可能
    const userId = user!.id;
    const result = await prisma.bookmark.deleteMany({
      where: {
        userId: userId,
        articleId: Number(req.query.id),
      },
    });

    console.log(userId);
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
