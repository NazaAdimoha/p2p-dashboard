"use client";
import { motion } from "framer-motion";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../nav-bar/home-page-nav";
import Link from "next/link";

export default function LandingPage() {
  const { user } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-12">
          <main className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold mb-6">
                Secure P2P Transactions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fast, secure, and reliable peer-to-peer payment solutions
              </p>
              <div className="flex justify-center space-x-6">
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-primary to-secondary text-white font-medium
                       px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                       hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {["Instant Transfers", "Bank-Grade Security", "24/7 Support"].map(
                (feature, i) => (
                  <motion.div
                    key={feature}
                    whileHover={{ y: -10 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="h-12 w-12 bg-blue-100 rounded-lg mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </motion.div>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border-t border-gray-200"
            >
              <p className="text-gray-600">
                Trusted by over 1 million users worldwide
              </p>
            </motion.div>
          </main>
        </div>
      </main>
    </div>
  );
}
