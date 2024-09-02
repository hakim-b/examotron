import { serverEnv } from "~/env/server";
import { Index } from "@upstash/vector";
import { ExamotronFile } from "~/types";

export const upstashIndex = new Index<ExamotronFile>({
  url: serverEnv.UPSTASH_VECTOR_REST_URL,
  token: serverEnv.UPSTASH_VECTOR_REST_TOKEN,
});
