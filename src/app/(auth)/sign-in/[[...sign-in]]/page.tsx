import SyncSpaceLogo from "@/components/Header/Logo";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import login from "../../../../../public/images/login.png";

export default function LoginPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-12">
        <section className="relative flex flex-col justify-center items-center bg-gray-900 lg:col-span-6">
          <Image 
            src={login} 
            alt="Login background image"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="z-10 flex items-center space-x-4 p-8">
            <SyncSpaceLogo />
          </div>

          <div className="z-10 mt-8 text-center text-white px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Welcome to Sync Space
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl max-w-md mx-auto">
              Your collaborative workspace for efficient document management and real-time collaboration.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-4 py-8 lg:col-span-6 bg-white dark:bg-gray-800">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Login
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Access your workspace in Sync Space
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg">
              <SignIn forceRedirectUrl="/dashboard" />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
