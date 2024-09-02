"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import { ModeToggle } from "./mode-toggle";
import AIChatButton from "./ai-chat-button";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Navbar() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <>
      <div className="mb-6 p-4 shadow-md dark:border">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <h2 className="text-3xl font-bold">Examotron</h2>
            </AnimatedShinyText>
          </div>

          <div className="flex items-center justify-center gap-4">
            <ModeToggle />
            {isSignedIn ? (
              <>
                <UserButton /> <AIChatButton />
              </>
            ) : (
              <Button onClick={() => router.push("/sign-in")}>
                Sign in to use the chat bot
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
