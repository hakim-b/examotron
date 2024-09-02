import { Bot } from "lucide-react";
import { MessageProps } from "~/types";

function SystemMessage({ content }: MessageProps) {
  return (
    <>
      <div className="mb-3 me-5 flex items-center justify-start">
        <Bot className="mr-2 shrink-0" />
        <p className="whitespace-pre-line rounded-md border bg-secondary px-1 py-2">
          {content}
        </p>
      </div>
    </>
  );
}

export default SystemMessage;
