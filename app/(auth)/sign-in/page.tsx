/* app/(auth)/sign-in/page.tsx */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface AuthFormData {
  email?: string;
  password: string;
  name?: string;
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const endpoint = isSignUp
      ? "http://127.0.0.1:5000/api/register"
      : "http://127.0.0.1:5000/api/login";

    const payload = isSignUp
      ? {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      console.log("payload", JSON.stringify(payload));

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        if (isSignUp) {
          toast.success("Registration successful! Please log in.");
          setIsSignUp(false);
          setFormData({
            email: "",
            password: "",
            name: "",
          });
        } else {
          toast.success("Login successful!");
          await router.push("/home");
        }
      } else {
        toast.error(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
      <h1 className="text-5xl font-bold font-mono my-4">TradeX</h1>
      <Card className="w-full max-w-md bg-transparent shadow-black">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Create a new account to get started."
              : "Welcome back! Please enter your details."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isSignUp
                  ? "Signing Up..."
                  : "Signing In..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
