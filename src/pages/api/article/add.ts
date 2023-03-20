import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // 認証情報の取得
  const session = await getSession({ req });

  if (session?.user?.email && req.body.title && req.body.content) {
    const loginUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
      select: {
        id: true,
      },
    });
    const result = await prisma.article.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorUserId: loginUser!.id,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized or FormEmpty' });
  }
}
