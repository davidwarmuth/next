import { navigationItems } from "@/config/site";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full py-20 border-t">
      <div className="px-4 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                <Link href="/">DW-NCC</Link>
              </h2>
              <p className="text-lg max-w-lg leading-relaxed tracking-tight text-foreground/75 text-left">
                Example of a NextJS app with Convex backend and Clerk authentification. {"(Next-Convex-Clerk)"}
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-foreground/75 text-left">
                <p>Reinaldstr. 15</p>
                <p>40882 Ratingen</p>
                <p>Germany</p>
              </div>
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-foreground/75 text-left">
                <Link href="https://www.davidwarmuth.de/agb">Terms of service</Link>
                <Link href="https://www.davidwarmuth.de/datenschutz">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex text-base gap-1 flex-col items-start"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xl">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-foreground/75">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
