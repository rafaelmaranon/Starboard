import {
  createCallerFactory,
  createTRPCRouter,
} from "~/server/trpc/main";
import { validateProductIdea } from "~/server/trpc/procedures/validateProductIdea";
import { getProductIdea } from "~/server/trpc/procedures/getProductIdea";
import { listProductIdeas } from "~/server/trpc/procedures/listProductIdeas";

export const appRouter = createTRPCRouter({
  validateProductIdea,
  getProductIdea,
  listProductIdeas,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
