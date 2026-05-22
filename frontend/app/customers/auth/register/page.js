"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountRegistrationSchema } from "@/util/validationSchemas";
import { useRegisterAccountMutation } from "@/lib/features/auth/accountApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";
import { Loader2 } from "lucide-react";

export default function Register() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ic = searchParams.get('ic');

  const form = useForm({
    resolver: zodResolver(accountRegistrationSchema),
    defaultValues: {
      firestName: "",
      lastName: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const [registerAccount, { isLoading }] = useRegisterAccountMutation();

  const handleRegister = async (data) => {
    try {
      const response = await registerAccount(data).unwrap();

      if (response?.status !== "success") {
        throw new Error(response?.message || "Registration failed");
      }

      dispatch(
        setCredential({
          accessToken: response.accessToken,
          firstName: response.firestName,
          email: response.email,
          role: response.role,
          id: response.id,
        })
      );

      toast({
        title: "Registration Successful!",
        description: `Welcome ${response.firstName}! Your account has been created.`,
        variant: "default",
      });

      const redirectPath = ic === 'order'
        ? '/customers/placeOrder'
        : "/merchant/business-setting";

      router.push(redirectPath);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.data?.message || "Please check your information and try again",
        variant: "destructive"
      });
    }
  };

  const renderInputField = (name, label, type = "text", placeholder = "") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 dark:text-gray-300">
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="h-12 text-base border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              autoComplete={type === "password" ? "new-password" : "off"}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500 text-sm" />
        </FormItem>
      )}
    />
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-2xl rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-orange-600 dark:text-orange-500">
            Join Our Community
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Create your account in just a few steps
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField("firestName", "First Name", "text", "John")}
                {renderInputField("lastName", "Last Name", "text", "Doe")}
              </div>

              {renderInputField("email", "Email", "email", "example@domain.com")}
              {renderInputField("password", "Password", "password", "••••••••")}

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500 transition-colors duration-200"
                disabled={isLoading || !form.formState.isValid}
                aria-label={isLoading ? "Creating account" : "Register"}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-3 pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/customers/auth/login"
              className="font-medium text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-500"
            >
              Sign In
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