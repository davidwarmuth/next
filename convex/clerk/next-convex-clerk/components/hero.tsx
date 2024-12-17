"use client";

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { FilePen, LogIn, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const Hero = () => {
  const { isLoaded } = useUser();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4" asChild>
              <Link href="/#features">
                See our app features <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="relative text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="relative text-spektr-cyan-50">
                <span className="gradient absolute -top-full -z-10 w-full aspect-square" />
                {/* -translate-y-1/2 */}
                This is something
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              An example of a NextJS app with Convex backend and Clerk
              authentification. {"(Next-Convex-Clerk)"}
            </p>
          </div>
          <div className="flex flex-row gap-3">
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
