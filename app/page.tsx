'use client';


import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-in"); // Navigate to the sign-in page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">AI Content Generator</h1>
      <p className="text-lg text-gray-700 mt-4">
        Revolutionize your content creation with our AI-powered tools.
      </p>
      <button
        onClick={handleGetStarted}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  );
}
