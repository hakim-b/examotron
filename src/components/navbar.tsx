import CommandPalette from "./command-palette";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <>
      <div className="mb-6 p-4 shadow-md dark:border">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <h2 className="text-3xl font-bold">Examotron</h2>
            </AnimatedShinyText>
          </div>

          <div className="flex items-center gap-2">
            <CommandPalette />
          </div>
          <div className="flex items-center justify-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
