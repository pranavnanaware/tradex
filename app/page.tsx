"use client";

import { useFetchUser } from "@/hooks/useFetchUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetchUser();

  useEffect(() => {
    // If there is an error, redirect to the sign-in page
    if (isError) {
      router.push("/sign-in");
    }
    // If user data is fetched successfully, redirect to the home page
    else if (data) {
      router.push("/home");
    }
  }, [isError, data, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show a redirecting message once the user data is fetched or an error occurs
  return <div>Redirecting...</div>;
};

export default Page;
