import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email && req.body.title && req.body.content) {
    const result = await prisma.article.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized or FormEmpty' });
  }
}
