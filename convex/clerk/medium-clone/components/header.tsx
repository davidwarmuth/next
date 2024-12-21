import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-4">
      <nav className="container flex gap-2 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="font-semibold">
            <Link href="/">NSC Template</Link>
          </h1>
          <ul className="flex gap-10 text-sm font-medium">
            <li>
              <Link href="/protected/server">Protected (server)</Link>
            </li>
            <li>
              <Link href="/protected/client">Protected (client)</Link>
            </li>
            <li>
              <Link href="/api/me">Who am I?</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
