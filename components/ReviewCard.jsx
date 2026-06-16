'use client';

import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

export default function ReviewCard({ review, index }) {
  const { name, role, rating, text } = review;

  // Generate avatar color based on name
  const colors = ['#00b4d8', '#0ea5e9', '#0077b6', '#f59e0b', '#22c55e'];
  const bgColor = colors[index % colors.length];
  const initials = role
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group rounded-2xl border border-[#1e293b] backdrop-blur-md p-8 transition-all duration-300 hover:border-[#00b4d8]/50 hover:shadow-lg hover:shadow-[#00b4d8]/20"
      style={{
        background: 'rgba(26, 26, 46, 0.5)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00b4d8] to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <HiStar
            key={i}
            className={`w-5 h-5 transition-colors ${
              i < rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#64748b]'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-[#e2e8f0] text-base mb-6 italic leading-relaxed">
        "{text}"
      </p>

      {/* Divider */}
      <div className="h-px bg-[#1e293b] mb-6"></div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>

        {/* Name and Role */}
        <div>
          
          <p className="text-[#94a3b8] text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
