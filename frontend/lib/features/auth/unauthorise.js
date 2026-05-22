"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js
// import { useNavigate } from "react-router-dom"; // For React Router
import { useToast } from "@/hooks/use-toast";

const useCheckUnauthorized = (error) => {
  const router = useRouter();
  const { toast } = useToast(); // Ensure correct toast usage

  useEffect(() => {
    if (error) {
      toast({
        title: "Unauthorized",
        description: "Unauthorized access. Redirecting to login...",
        variant: "destructive",
      });
      // router.push("/auth/login");
    }
  }, [error, router, toast]);
};

export default useCheckUnauthorized;
