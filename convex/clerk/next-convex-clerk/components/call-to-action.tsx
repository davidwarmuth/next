"use client";

import { FilePen, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export const CTA = () => {
  const { isLoaded } = useUser();
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col text-center py-14 gap-4 items-center">
          <div>
            <Badge>Get started</Badge>
          </div>
          <div className="flex flex-col gap-2 relative">
            <span className="gradient absolute -top-full -z-10 w-full aspect-square" />
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Try our Next-Convex-Clerk Web-App!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              Sign up and log in to get access to the protected task pages and
              see the Clerk-Authentication in action.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            {isLoaded ? (
              <>
                <SignInButton>
                  <Button size="lg" className="gap-4" variant="outline">
                    Log in <LogIn className="w-4 h-4" />
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="lg" className="gap-4">
                    Sign up here <FilePen className="w-4 h-4" />
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Button size="lg" className="gap-4" variant="outline" disabled>
                  Log in <LogIn className="w-4 h-4" />
                </Button>
                <Button size="lg" className="gap-4" disabled>
                  Sign up here <FilePen className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
