import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
    UPSTASH_VECTOR_REST_URL: z.string().url(),
    UPSTASH_VECTOR_REST_TOKEN: z.string(),
    CLERK_SECRET_KEY: z.string(),
  },

  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
    UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
});
