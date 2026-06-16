'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

export default function HeroHeader() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  const HeroCamera3D = dynamic(() => import('./HeroCamera3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full">
        
        {/* ✅ Left side - Heading */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Creative Content.
            <br />
            <span className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] bg-clip-text text-transparent">
              Real Growth.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-8">
            We craft scroll-stopping visuals and strategies that turn views into customers.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#00b4d8] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#0077b6] hover:text-white transition-colors">
              View Portfolio
            </button>
            <button className="border border-[#00b4d8] text-[#00b4d8] px-8 py-3 rounded-full font-semibold hover:bg-[#00b4d8] hover:text-black transition-colors">
              Get In Touch
            </button>
          </div>
        </motion.div>

        {/* ✅ Right side - 3D Camera */}
        <div className="h-[500px] md:h-[600px] w-full">
          <HeroCamera3D />
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00b4d8]/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
