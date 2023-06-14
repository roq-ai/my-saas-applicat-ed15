import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { sellerValidationSchema } from 'validationSchema/sellers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSellers();
    case 'POST':
      return createSeller();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSellers() {
    const data = await prisma.seller
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'seller'));
    return res.status(200).json(data);
  }

  async function createSeller() {
    await sellerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.account_manager?.length > 0) {
      const create_account_manager = body.account_manager;
      body.account_manager = {
        create: create_account_manager,
      };
    } else {
      delete body.account_manager;
    }
    if (body?.guest?.length > 0) {
      const create_guest = body.guest;
      body.guest = {
        create: create_guest,
      };
    } else {
      delete body.guest;
    }
    if (body?.keyword?.length > 0) {
      const create_keyword = body.keyword;
      body.keyword = {
        create: create_keyword,
      };
    } else {
      delete body.keyword;
    }
    const data = await prisma.seller.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
