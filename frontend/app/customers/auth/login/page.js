"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountLoginSchema } from "@/util/validationSchemas";
import { useLoginMutation } from "@/lib/features/auth/accountApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const ic = searchParams.get('ic');
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(accountLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    mode: "onChange"
  });

  const handleLogin = async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response?.status !== "success") {
        throw new Error(response?.message || "Login failed");
      }

      dispatch(setCredential({
        accessToken: response.accessToken,
        firstName: response.firstName, // Fixed typo from firestName
        email: response.email,
        role: response.role,
        id: response.id
      }));

      const redirectPath = ic === 'order'
        ? '/customers/placeOrder'
        : response.role === 'ADMIN'
          ? "/system-admin"
          : "/merchant";

      router.push(redirectPath);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.firstName || 'User'}!`,
        variant: "default",
      });

    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.data?.message || error.message || "Please check your credentials and try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4  dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-2xl rounded-xl bg-white dark:bg-gray-800  dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-orange-600 dark:text-orange-500">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@domain.com"
                        className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex items-center mx-auto justify-end">

                <Link
                  href="/customers/auth/forgot-password"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-500"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500 transition-colors duration-200"
                disabled={isLoading || !form.formState.isValid}
                aria-label={isLoading ? "Logging in" : "Login"}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-3 pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to our platform?{" "}
            <Link
              href="/customers/auth/register"
              className="font-medium text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-500"
            >
              Create an account
            </Link>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}