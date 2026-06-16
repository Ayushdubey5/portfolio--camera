'use client';

import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

export default function PricingCard({ plan, index }) {
  const { planName, price, period, popular, color, features, notIncluded } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`relative group rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
        popular
          ? 'border-[#00b4d8] md:scale-105 z-10 shadow-2xl shadow-[#00b4d8]/30'
          : 'border-[#1e293b] hover:border-[#00b4d8]/50'
      }`}
      style={{
        background: 'rgba(26, 26, 46, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Popular Badge */}
      <div className="relative overflow-hidden rounded-2xl ...">
  
  {popular && (
    <div className="flex justify-center pt-4 mb-2"> {/* ✅ padding instead of -translate-y */}
      <span className="bg-[#00b4d8] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-[#00b4d8]/30">
        MOST POPULAR
      </span>
    </div>
  )}

  {/* rest of card content */}
</div>

      <div className="p-8 md:p-12">
        {/* Plan Name */}
        <div
          className="text-sm font-bold uppercase tracking-widest mb-2 transition-colors"
          style={{ color: color }}
        >
          {planName}
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-sans">
            {price}
          </div>
          <div className="text-[#94a3b8] text-sm">{period}</div>
        </div>

        {/* Divider */}
        <div
          className="h-0.5 mb-8"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`
          }}
        ></div>

        {/* Features List */}
        <div className="mb-8 space-y-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <HiCheck className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-1" />
              <span className="text-[#e2e8f0] text-sm leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Not Included Items */}
        {notIncluded.length > 0 && (
          <div className="mb-8 space-y-2 pb-8 border-t border-[#1e293b] pt-8">
            {notIncluded.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-[#64748b] text-lg">—</span>
                <span className="text-[#64748b] text-sm">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
            popular
              ? 'bg-[#00b4d8] text-black hover:shadow-lg hover:shadow-[#00b4d8]/50'
              : 'border border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8]/10'
          }`}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}
