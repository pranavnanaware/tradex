"use client";

import { useFetchUser } from "@/hooks/useFetchUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetchUser();

  useEffect(() => {
    if (isError) {
      router.push("/sign-in");
    } else if (data) {
      router.push("/home");
    }
  }, [isError, data, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
};

export default Page;
