import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { generateObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";
import { env } from "~/server/env";

const validationSchema = z.object({
  userAnalysis: z.object({
    targetUsers: z.array(z.string()).describe("Primary target user segments"),
    userPersonas: z.array(z.object({
      name: z.string(),
      demographics: z.string(),
      painPoints: z.array(z.string()),
      goals: z.array(z.string())
    })).describe("Detailed user personas"),
    userJourney: z.array(z.string()).describe("Key steps in user journey")
  }),
  painPoints: z.object({
    primaryProblems: z.array(z.object({
      problem: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      frequency: z.enum(["rare", "occasional", "frequent", "constant"]),
      currentSolutions: z.array(z.string())
    })),
    marketGap: z.string().describe("What gap exists in current market solutions")
  }),
  features: z.object({
    coreFeatures: z.array(z.object({
      name: z.string(),
      description: z.string(),
      priority: z.enum(["must-have", "should-have", "nice-to-have"]),
      complexity: z.enum(["low", "medium", "high"]),
      userValue: z.string()
    })),
    mvpFeatures: z.array(z.string()).describe("Minimum viable product features"),
    futureFeatures: z.array(z.string()).describe("Features for later iterations")
  }),
  risks: z.object({
    technicalRisks: z.array(z.object({
      risk: z.string(),
      probability: z.enum(["low", "medium", "high"]),
      impact: z.enum(["low", "medium", "high"]),
      mitigation: z.string()
    })),
    marketRisks: z.array(z.object({
      risk: z.string(),
      probability: z.enum(["low", "medium", "high"]),
      impact: z.enum(["low", "medium", "high"]),
      mitigation: z.string()
    })),
    businessRisks: z.array(z.object({
      risk: z.string(),
      probability: z.enum(["low", "medium", "high"]),
      impact: z.enum(["low", "medium", "high"]),
      mitigation: z.string()
    }))
  }),
  metrics: z.object({
    successMetrics: z.array(z.object({
      metric: z.string(),
      target: z.string(),
      timeframe: z.string(),
      measurement: z.string()
    })),
    kpis: z.array(z.string()).describe("Key Performance Indicators"),
    validationMetrics: z.array(z.string()).describe("Metrics to validate product-market fit")
  }),
  marketAnalysis: z.object({
    marketSize: z.object({
      tam: z.string().describe("Total Addressable Market"),
      sam: z.string().describe("Serviceable Addressable Market"),
      som: z.string().describe("Serviceable Obtainable Market")
    }),
    competition: z.array(z.object({
      competitor: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      differentiation: z.string()
    })),
    validationSteps: z.array(z.string()).describe("Steps to validate market demand")
  }),
  viabilityScore: z.number().min(1).max(10).describe("Overall viability score from 1-10"),
  recommendation: z.enum(["proceed", "proceed-with-caution", "pivot-needed", "stop"]).describe("Overall recommendation"),
  reasoning: z.string().describe("Detailed reasoning for the recommendation"),
  nextSteps: z.array(z.object({
    step: z.string(),
    priority: z.enum(["high", "medium", "low"]),
    timeframe: z.string(),
    resources: z.string()
  }))
});

export const validateProductIdea = baseProcedure
  .input(z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    targetMarket: z.string().optional()
  }))
  .mutation(async ({ input }) => {
    try {
      // Initialize OpenRouter client
      const openrouter = createOpenRouter({
        apiKey: env.OPENROUTER_API_KEY,
      });

      // Create the AI model
      const model = openrouter("openai/gpt-4o");

      // Generate structured validation analysis
      const { object: validation } = await generateObject({
        model,
        schema: validationSchema,
        prompt: `As an expert AI Product Manager, analyze this product idea and provide a comprehensive validation assessment:

Title: ${input.title}
Description: ${input.description}
${input.targetMarket ? `Target Market: ${input.targetMarket}` : ''}

Provide a thorough analysis covering:
1. User Analysis - Who are the target users, their personas, and journey
2. Pain Points - What problems does this solve and how severe are they
3. Features - Core features, MVP scope, and future roadmap
4. Risks - Technical, market, and business risks with mitigation strategies
5. Metrics - Success metrics, KPIs, and validation approaches
6. Market Analysis - Market size, competition, and validation steps

Be specific, actionable, and honest in your assessment. Consider both opportunities and challenges.`,
      });

      // Save to database
      const productIdea = await db.productIdea.create({
        data: {
          title: input.title,
          description: input.description,
          targetMarket: input.targetMarket,
          validation: {
            create: {
              userAnalysis: validation.userAnalysis,
              painPoints: validation.painPoints,
              features: validation.features,
              risks: validation.risks,
              metrics: validation.metrics,
              marketAnalysis: validation.marketAnalysis,
              viabilityScore: validation.viabilityScore,
              recommendation: validation.reasoning,
              nextSteps: validation.nextSteps,
            }
          }
        },
        include: {
          validation: true
        }
      });

      return {
        id: productIdea.id,
        validation: validation
      };

    } catch (error) {
      console.error("Error validating product idea:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to validate product idea. Please try again.",
      });
    }
  });
