import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const getProductIdea = baseProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const productIdea = await db.productIdea.findUnique({
      where: { id: input.id },
      include: { validation: true }
    });

    if (!productIdea) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product idea not found",
      });
    }

    return productIdea;
  });
