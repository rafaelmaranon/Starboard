import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const listProductIdeas = baseProcedure
  .query(async () => {
    const productIdeas = await db.productIdea.findMany({
      include: {
        validation: {
          select: {
            viabilityScore: true,
            recommendation: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return productIdeas;
  });
