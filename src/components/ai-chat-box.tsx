"use client";

import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AI } from "~/app/actions";
import UserMessage from "./user-message";
import { cn } from "~/lib/utils";
import { Trash, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { continueConversation } = useActions<typeof AI>();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConversation((currentConversation) => [
      ...currentConversation,
      {
        id: generateId(),
        role: "user",
        display: <UserMessage content={prompt} />,
      },
    ]);

    const message = await continueConversation(prompt);

    setConversation((currentConversation) => [...currentConversation, message]);
    setPrompt("");
  };

  return (
    <>
      <div
        className={cn(
          "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 animate-in fade-in zoom-in-50 xl:right-36",
          open ? "fixed" : "hidden",
        )}
      >
        <div className="relative flex h-[600px] flex-col rounded-lg border bg-background shadow-xl">
          <button onClick={onClose} className="ms-auto block">
            <XCircle size={30} />
          </button>
          <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
            {conversation.map((message) => (
              <div key={message.id}>{message.display}</div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="m-3 flex gap-1">
            <Button
              className="shrink-0"
              title="Clear chat"
              variant="destructive"
              type="button"
              size="icon"
              onClick={() => setConversation([])}
            >
              <Trash />
            </Button>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Say something..."
              ref={inputRef}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AIChatBox;
