"use server";

import { ReactNode } from "react";
import { generateId } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openaiModel } from "~/lib/openai";
import SystemMessage from "~/components/system-message";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState<typeof AI>();

  const result = await streamUI({
    model: openaiModel,
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        const numOfMsgs: { role: "user" | "assistant"; content: string }[] = [
          ...history.get(),
          { role: "assistant", content },
        ];

        history.done(numOfMsgs);
      }

      return <SystemMessage content={content} />;
    },
    tools: {

    }
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<
  ServerMessage[],
  ClientMessage[],
  {
    continueConversation: typeof continueConversation;
  }
>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
