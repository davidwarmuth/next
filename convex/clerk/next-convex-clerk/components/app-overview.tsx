import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import clsx from "clsx";

const appFunctions = [
  {
    title: "NextJS",
    description:
      "To create high-quality web applications with the power of React components.",
    icon: "/icons/next-js.svg",
    invertIcon: true,
    link: "https://nextjs.org/",
    filter: "Framework",
  },
  {
    title: "Convex",
    description:
      "Convex is the sync platform that replaces your backend and client state management.",
    icon: "/icons/convex.png",
    invertIcon: false,
    link: "https://www.convex.dev/",
    filter: "Backend",
  },
  {
    title: "Clerk",
    description:
      "Is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.",
    icon: "/icons/clerk-logo.png",
    invertIcon: false,
    link: "https://clerk.com/",
    filter: "Authentication",
  },
  {
    title: "TWBlock",
    description:
      "Beautifully designed website blocks for your SaaS website. Easily customizable with shadcn-ui themes and works in dark- and light mode.",
    icon: "/icons/twblocks.ico",
    invertIcon: true,
    link: "https://www.twblocks.com/",
    filter: "UX/UI",
  },
  {
    title: "Shadcn/UI",
    description:
      "Beautifully designed components that you can copy and paste into your apps.",
    icon: "/icons/shadcn-ui.svg",
    invertIcon: true,
    link: "https://ui.shadcn.com/",
    filter: "UX/UI",
  },
  {
    title: "TailwindCSS",
    description:
      "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    icon: "/icons/tailwindcss.svg",
    invertIcon: false,
    link: "https://tailwindcss.com/",
    filter: "Styling",
  },
];

export function AppOverview() {
  return (
    <div id="features" className="py-20">
      <div className="mx-auto container flex flex-col gap-4">
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            App Features
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            The <strong>Tech-Stack</strong> I have used to create this{" "}
            <span className="italic">Next-Convex-Clerk</span> Web-App.
          </p>
        </div>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {appFunctions.map((e, index) => (
            <OverviewElement key={index} {...e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function OverviewElement(props: {
  title: string;
  description: string;
  icon: string;
  invertIcon: boolean;
  link: string;
  filter: string;
  key: string | number;
}) {
  return (
    <Card className="min-w-fit">
      <CardHeader className="h-full gap-1">
        {/* <div className="flex justify-end">
          <Badge variant="secondary">{props.filter}</Badge>
        </div> */}
        <div className="p-2 flex items-center gap-2">
          <Image
            src={props.icon}
            alt={props.title + " Icon"}
            width={24}
            height={24}
            className={clsx("size-6", {
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
