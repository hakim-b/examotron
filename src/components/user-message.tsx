"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { MessageProps } from "~/types";

function UserMessage({ content }: MessageProps) {
  const { user } = useUser();

  return (
    <>
      <div className="mb-3 me-5 flex items-center justify-end">
        <p className="whitespace-pre-line rounded-md border bg-primary px-1 py-2 text-primary-foreground">
          {content}
        </p>
        {user?.hasImage && (
          <Image
            src={user.imageUrl}
            alt="User Image"
            width={100}
            height={100}
            className="ml-2 h-10 w-10 rounded-full object-cover"
          />
        )}
      </div>
    </>
  );
}

export default UserMessage;
