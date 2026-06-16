'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroCamera3D = dynamic(() => import('./HeroCamera3D'), { ssr: false });

export default function ScrollingCamera() {
  const [currentSection, setCurrentSection] = useState(0);
  const [position, setPosition] = useState({ x: '70%', y: '20%' });
  const [size, setSize] = useState(350);
  const [isVisible, setIsVisible] = useState(false); // ✅ Hidden by default
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // ✅ Match these IDs to your actual sections
      const sections = ['hero', 'gallery', 'videos', 'packages', 'reviews'];
      const scrollY = window.scrollY + window.innerHeight / 2;

      let activeSection = 0;
      let activeY = '20%';
      let activeX = '70%';
      let activeSize = 350;

      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollY >= top && scrollY <= bottom) {
          activeSection = index;

          // ✅ Alternate left/right per section
          activeX = index % 2 === 0 ? '72%' : '3%';

          // ✅ Vertical position
          activeY = `${15 + ((scrollY - top) / el.offsetHeight) * 50}%`;

          // ✅ Size shrinks as we scroll down (350 → 200)
          activeSize = Math.max(200, 350 - (index - 1) * 40);
        }
      });

      // ✅ HIDE ON HERO SECTION (index 0)
      const shouldShow = activeSection !== 0;

      // ✅ Hide on footer
      const footer = document.getElementById('footer');
      let inFooter = false;
      if (footer) {
        const footerTop = footer.offsetTop;
        inFooter = window.scrollY + window.innerHeight >= footerTop + 100;
      }

      setIsVisible(shouldShow && !inFooter);
      setCurrentSection(activeSection);
      setPosition({ x: activeX, y: activeY });
      setSize(activeSize);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            left: position.x,
            top: position.y,
            width: size,
            height: size,
          }}
          exit={{ opacity: 0, scale: 0, rotate: 30 }}
          transition={{
            type: 'spring',
            stiffness: 70,
            damping: 15,
            mass: 1.2,
          }}
          style={{
            position: 'fixed',
            zIndex: 40,
            pointerEvents: 'auto',
          }}
        >
          <HeroCamera3D currentSection={currentSection} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}