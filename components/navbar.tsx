import { auth, signOut } from "@/lib/auth";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import Form from "next/form";
import { buttonVariants } from "./ui/button";
import { Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

async function Navbar() {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  const userInitials = () => {
    if (!session?.user?.name) return "??";
    const names = session.user.name.split(" ");
    if (names.length === 1) return names[0][0];
    return names[0][0] + names[1][0];
  };

  return (
    <>
      <div className="mb-6 p-4 shadow-md dark:border">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <Link href="/">
                <h2 className="text-3xl font-bold">Examotron</h2>
              </Link>
            </AnimatedShinyText>
          </div>

          <div className="flex items-center justify-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={session.user?.image!} />
                    <AvatarFallback>{userInitials()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign in to use <Bot />
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
