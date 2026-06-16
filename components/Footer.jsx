'use client';

import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedinIn, FaFacebook, FaYoutube, FaVoicemail } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/theintegrty?igsh=MXIzMnRiZHk5ZDdlNA==', label: 'Instagram' },
    { icon: FaVoicemail, href: 'info@theintegrty.com', label: 'Email' },
    { icon: FaLinkedinIn, href: 'https://in.linkedin.com/company/theintegrty', label: 'LinkedIn' },
    { icon: FaFacebook, href: 'https://www.facebook.com/theeintegrty', label: 'Facebook' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer id="contact" className="relative bg-[#050505] border-t border-[#1e293b] px-4 md:px-0">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent"></div>

      <div className="max-w-7xl mx-auto py-16 md:py-24">
        {/* Contact Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Get in Touch
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <motion.a
                href="mailto:hello@yourbrand.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[#111827] flex items-center justify-center group-hover:bg-[#00b4d8] transition-colors duration-300">
                  <HiMail className="w-6 h-6 text-[#00b4d8] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[#94a3b8] text-sm">Email</p>
                  <p className="text-white font-semibold group-hover:text-[#00b4d8] transition-colors">info@theintegrty.com</p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+919876543210"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[#111827] flex items-center justify-center group-hover:bg-[#00b4d8] transition-colors duration-300">
                  <HiPhone className="w-6 h-6 text-[#00b4d8] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[#94a3b8] text-sm">Phone</p>
                  <p className="text-white font-semibold group-hover:text-[#00b4d8] transition-colors">+91 9643799487</p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[#111827] flex items-center justify-center hover:bg-[#00b4d8] transition-colors duration-300">
                  <HiLocationMarker className="w-6 h-6 text-[#00b4d8] hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[#94a3b8] text-sm">Location</p>
                  <p className="text-white font-semibold hover:text-[#00b4d8] transition-colors">Faridabad | Delhi|Agra</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <h4 className="text-xl font-bold text-white mb-6">Send us a Message</h4>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-3 rounded-lg bg-[#111827] border border-[#1e293b] text-white placeholder-[#64748b] focus:border-[#00b4d8] focus:outline-none transition-colors"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-3 rounded-lg bg-[#111827] border border-[#1e293b] text-white placeholder-[#64748b] focus:border-[#00b4d8] focus:outline-none transition-colors"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-6 py-3 rounded-lg bg-[#111827] border border-[#1e293b] text-white placeholder-[#64748b] focus:border-[#00b4d8] focus:outline-none transition-colors resize-none"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-[#00b4d8] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00b4d8]/50 transition-all duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Social Links & Copyright */}
        <div className="border-t border-[#1e293b] pt-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center hover:bg-[#00b4d8] transition-colors duration-300 group"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 text-[#00b4d8] group-hover:text-black transition-colors" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Copyright */}
            <motion.p
              variants={itemVariants}
              className="text-[#64748b] text-sm text-center md:text-right"
            >
              © {currentYear} Your Brand. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
