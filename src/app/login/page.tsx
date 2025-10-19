"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const tryPassword = async () => {
      const pw = prompt("Enter password to view this page:");
      if (!pw) {
        alert("Access denied");
        return;
      }

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pw }),
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          alert("Login successful!");
          router.push("/");
        } else {
          alert(data.message || "Access denied");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(`An error occurred: ${err.message}`);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    tryPassword();
  }, [router]);

  return null;
}
