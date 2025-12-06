import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-6">Welcome to Auth System</h1>
        <p className="text-xl mb-12 text-indigo-100">
          A professional authentication solution built with Next.js, TypeScript,
          and MongoDB
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-50 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
