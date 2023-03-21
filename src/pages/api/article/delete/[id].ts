import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    const loginUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    const result = await prisma.article.deleteMany({
      where: {
        id: Number(req.query.id),
        AND: {
          author: {
            id: loginUser!.id,
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized or FormEmpty' });
  }
}
