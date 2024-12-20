"use client";

import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import { ExternalLink, LinkIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const tasksFeatures = [
  {
    title: "TanStack Table",
    description:
      "Supercharge your tables or build a datagrid from scratch for TS/JS, React, Vue, Solid, Svelte & Lit while retaining 100% control over markup and styles.",
    icon: "/icons/tanstack-logo.png",
    invertIcon: false,
    link: "https://tanstack.com/table/latest",
    filter: "Headless UI library",
  },
  {
    title: "Recharts",
    description: "A composable charting library built on React components.",
    icon: "/icons/react-icon.png",
    invertIcon: false,
    link: "https://recharts.org/en-US/",
    filter: "React library",
  },
  {
    title: "Shadcn/UI",
    description:
      "Beautifully designed components that you can copy and paste into your apps. For example the Data Table component with the TanStack Table as the basis.",
    icon: "/icons/shadcn-ui.svg",
    invertIcon: true,
    link: "https://ui.shadcn.com/",
    filter: "UX/UI",
  },
];

export function TasksFeatures() {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    const x = ev.clientX;
    const y = ev.clientY;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div
      id="features"
      className="py-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto container flex flex-col gap-4">
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            Tasks Features
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            The <strong>Tools</strong> I have used to create this tasks pages,
            in addition to the{" "}
            <Link
              href="/#features"
              className="w-fit inline-flex gap-2 items-center hover:underline underline-offset-4 transition-all duration-1000"
            >
              app features <LinkIcon className="size-4" />
            </Link>
            .
          </p>
        </div>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {tasksFeatures.map((e, index) => (
            <FeatureElement key={index} mousePosition={mousePosition} {...e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureElement(props: {
  title: string;
  description: string;
  icon: string;
  invertIcon: boolean;
  link: string;
  filter: string;
  key: string | number;
  mousePosition: {
    x: number;
    y: number;
  } | null;
}) {
  const [glowPosition, setGlowPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const rectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rect = rectRef.current?.getBoundingClientRect();
    /* console.log(
      "Called Card useEffect. With mousePosition: { x: " +
        props.mousePosition?.x +
        ", y: " +
        props.mousePosition?.y +
        " } and rect: { x: " +
        rect?.x +
        ", y: " +
        rect?.y +
        " }"
    ); */
    if (!props.mousePosition || !rect) return;
    const x = props.mousePosition?.x - rect.left - rect.width / 2;
    const y = props.mousePosition?.y - rect.top - rect.height / 2;
    setGlowPosition({ x, y });
  }, [props.mousePosition]);
  return (
    <Card className="min-w-fit p-[2px] bg-neutral-500/20 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none -z-10">
        {glowPosition && (
          <>
            <div
              className="blur-2xl absolute size-64 rounded-full bg-black/60 dark:bg-white/60"
              style={{
                left: glowPosition.x + "px",
                top: glowPosition.y + "px",
              }}
            />
          </>
        )}
        <div
          className="absolute size-64 top-0 left-0 rounded-full"
          style={{ display: "hidden" }}
          ref={rectRef}
        />
      </div>
      <CardHeader className="h-full gap-1 bg-background rounded-lg transition-colors hover:bg-white/80 dark:hover:bg-neutral-950/80 hover:backdrop-blur-3xl">
        {/* <div className="flex justify-end">
          <Badge variant="secondary">{props.filter}</Badge>
        </div> */}
        <div className="p-2 flex items-center gap-2">
          <Image
            src={props.icon}
            alt={props.title + " Icon"}
            width={24}
            height={24}
            className={clsx("size-6 object-contain", {
              "dark:invert": props.invertIcon,
            })}
          />
          <h3 className="text-lg">{props.title}</h3>
          <Badge variant="secondary" className="ml-auto">
            {props.filter}
          </Badge>
        </div>
        <p className="text-muted-foreground">{props.description}</p>
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 w-fit flex items-end hover:underline underline-offset-4 transition-all duration-1000"
        >
          <span className="flex gap-2 items-center">
            Learn more
            <ExternalLink className="size-4" />
          </span>
        </a>
      </CardHeader>
    </Card>
  );
}
