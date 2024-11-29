"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    // Überprüfe, ob die Seite direkt aufgerufen wurde (kein Referrer)
    if (typeof document !== "undefined") {
        setShowHome(!document.referrer);
      }
  }, []);

  const handleButtonClick = () => {
    if (showHome) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <div className="p-4 flex-1 flex flex-col gap-2 items-center justify-center">
      <Icons.notFound className="size-24 fill-neutral-300" />
      <div className="text-center">
        <h2 className="text-2xl">404 | Not Found</h2>
        <p className="text-muted-foreground">
          Die angeforderte Ressource konnte nicht gefunden werden.
        </p>
      </div>
      <Button variant="outline" className="mt-2" onClick={handleButtonClick}>
        <ArrowLeft className="size-5" />
        {showHome ? "Home" : "Zurück"}
      </Button>
    </div>
  );
}
