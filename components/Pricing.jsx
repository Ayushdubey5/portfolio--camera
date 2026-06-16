'use client';

import { motion } from 'framer-motion';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import { pricingData } from '@/data/pricingData';

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a] px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Our Packages
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00b4d8] to-transparent mx-auto mb-6"></div>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your business growth. All plans include dedicated support and comprehensive reporting.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pricingData.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Detailed Comparison
          </h3>
          <ComparisonTable />
        </motion.div>
      </div>
    </section>
  );
}
