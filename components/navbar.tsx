import { auth, signIn } from "@/lib/auth";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Show } from "react-haiku";
import SignOutBtn from "./sign-out-btn";
import Form from "next/form";
import { Button } from "./ui/button";

async function Navbar() {
  const session = await auth();

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
            {/*@ts-ignore */}
            <Show>
              <Show.When isTrue={session !== null}>
                <SignOutBtn />
              </Show.When>
              <Show.Else>
                <Form
                  action={async () => {
                    "use server";
                    await signIn();
                  }}
                >
                  <Button type="submit">Sign In</Button>
                </Form>
              </Show.Else>
            </Show>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
