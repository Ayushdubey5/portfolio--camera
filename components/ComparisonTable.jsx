'use client';

import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

export default function ComparisonTable() {
  const services = [
    'Social Media Platforms',
    'Posts per month',
    'Reels per month',
    'Stories per week',
    'Graphic designing',
    'Photo shoots',
    'Video shoots',
    'GMB management',
    'Influencer coordination',
    'Monthly performance report',
    'Dedicated account manager',
    'Campaign / IP creation',
    'Paid ads management',
    'Website management',
    'Dedicated COD on account'
  ];

  const plans = [
    {
      name: 'Basic',
      price: '₹40k',
      values: [
        'IG + FB',
        '12',
        '4',
        '3',
        'Yes',
        '1',
        '1',
        'Yes',
        'No',
        'Yes',
        'Yes',
        'No',
        'No',
        'No',
        'No'
      ]
    },
    {
      name: 'Standard',
      price: '₹60k',
      values: [
        'IG + FB + YT',
        '20',
        '8',
        '5',
        'Yes',
        '2',
        '2',
        'Yes',
        'Up to 2',
        'Yes',
        'Yes',
        'Yes',
        'Add-on',
        'No',
        'No'
      ]
    },
    {
      name: 'Premium',
      price: '₹90k',
      values: [
        'IG + FB + YT + LinkedIn',
        '30+',
        '12+',
        'Daily',
        'Yes',
        '4',
        '4',
        'Yes',
        'Up to 5',
        'Yes',
        'Yes',
        'Yes',
        'Yes',
        'Yes',
        'Yes'
      ]
    }
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1e293b] backdrop-blur-md" style={{ background: 'rgba(26, 26, 46, 0.3)' }}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1e293b]">
            <th className="px-6 py-4 text-left bg-[#111827]">
              <span className="text-white font-bold text-sm uppercase tracking-wider">Service</span>
            </th>
            {plans.map((plan, idx) => (
              <th key={idx} className="px-6 py-4 text-center" style={{
                background: idx === 1 ? '#0077b6' : '#111827'
              }}>
                <div className="text-white font-bold uppercase text-sm">{plan.name}</div>
                <div className="text-[#94a3b8] text-xs mt-1">{plan.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {services.map((service, serviceIdx) => (
            <motion.tr
              key={serviceIdx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: serviceIdx * 0.02 }}
              className="border-b border-[#1e293b] hover:bg-[#111827]/50 transition-colors"
              style={{
                background: serviceIdx % 2 === 0 ? 'rgba(15, 23, 42, 0.2)' : 'rgba(30, 41, 59, 0.2)'
              }}
            >
              <td className="px-6 py-4 font-semibold text-[#e2e8f0] text-sm sticky left-0 bg-[#0a0a0a] z-10">
                {service}
              </td>
              {plans.map((plan, planIdx) => (
                <td key={planIdx} className="px-6 py-4 text-center">
                  {plan.values[serviceIdx] === 'Yes' ? (
                    <HiCheck className="w-5 h-5 text-[#22c55e] mx-auto" />
                  ) : plan.values[serviceIdx] === 'No' ? (
                    <span className="text-[#64748b]">—</span>
                  ) : (
                    <span className="text-[#e2e8f0] font-medium text-sm">{plan.values[serviceIdx]}</span>
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
