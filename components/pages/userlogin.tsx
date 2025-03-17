"use client";
import React, { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react"; // Import loading spinner

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Column - Illustration */}
      <div className="relative hidden w-full bg-blue-50 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-800">Campus Connect</h1>
            <p className="mt-2 text-blue-600">Your gateway to campus resources</p>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="College illustration"
            width={400}
            height={400}
            className="rounded-lg"
            priority
          />
          <div className="mt-8 max-w-md text-center text-blue-700">
            <p className="text-lg font-medium">Access your courses, grades, and campus resources in one place</p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form className="mt-8 space-y-6">
            <Button
              onClick={handleSignIn}
              type="button"
              variant="outline"
              className="w-full h-10 flex items-center justify-center gap-2 border-blue-300 hover:bg-blue-50"
              disabled={loading} // Disable while loading
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
