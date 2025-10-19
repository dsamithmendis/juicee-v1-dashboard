"use client";

import { useEffect, useState } from "react";
import CardsPage from "@/components/pages/cards";

export default function Home() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const pw = prompt("Enter password to view this page:");
    const expected = process.env.SECRETS_SCAN_OMIT_PATHS;
    if (pw === expected) setAuthorized(true);
    else {
      alert("Access denied");
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) return null;
  if (!authorized) return <div>Access denied</div>;

  return <CardsPage />;
}
