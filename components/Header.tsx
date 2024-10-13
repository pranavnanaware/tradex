"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TickerTape from "./TickerTape";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useLogout } from "@/hooks/useLogout";

export function Header() {
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useFetchUser();

  const {
    mutate: logoutMutate,
    isError: isLogoutError,
    error: logoutError,
  } = useLogout();

  if (isError) {
    router.push("/sign-in");
  }

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: (data) => {
        console.log("Logout successful:", data);
        router.push("/sign-in");
      },
      onError: (error) => {
        console.error("Logout failed:", error.message);
      },
    });
  };

  return (
    <header className="top-0 z-50 w-full bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl border-b">
      <div className="flex flex-col">
        <div className="flex items-center justify-between h-16 px-12">
          <div className="flex items-center">
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <Link href="/home" rel="nofollow">
                <h1 className="text-2xl font-semibold">TradeX</h1>
              </Link>
            </React.Suspense>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/holdings")}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-white"
              )}
            >
              Holdings
            </Button>
            <Button
              onClick={() => router.push("/portfolio")}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-white"
              )}
            >
              Portfolio
            </Button>
            <Button
              onClick={() => {
                handleLogout();
                router.push("/sign-in");
              }}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-white"
              )}
            >
              {data ? "Sign Out" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
