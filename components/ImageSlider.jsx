'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { imagesData } from '@/data/imagesData';

export default function ImageSlider() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const handlePrev = (e) => {
    e.stopPropagation();
    const newIndex = (selectedIndex - 1 + validImages.length) % validImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(validImages[newIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const newIndex = (selectedIndex + 1) % validImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(validImages[newIndex]);
  };

  const handleOpen = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const validImages = imagesData.filter((img) => !imageErrors[img.id]);

  return (
    <section id="gallery" className="py-24 bg-[#111827] px-4 md:px-0">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Our Creative Work
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00b4d8] to-transparent mx-auto" />
        </motion.div>

        {/* Image Slider */}
        <div className="relative px-14">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.gallery-next',
              prevEl: '.gallery-prev',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            grabCursor={true}
            className="pb-12"
          >
            {validImages.map((image, index) => (
              <SwiperSlide key={image.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="group cursor-pointer"
                  onClick={() => handleOpen(image, index)}
                >
                  {/* ✅ 4:5 aspect ratio card */}
                  <div
                    className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] w-full"
                    style={{ aspectRatio: '4/5' }}
                  >
                    {/* ✅ Next.js Image - auto compresses + WebP + lazy loads */}
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 3 ? 'eager' : 'lazy'} // ✅ first 3 load instantly
                      onError={() => handleImageError(image.id)}
                    />

                    {/* Hover zoom icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-8 h-8 rounded-full bg-[#00b4d8]/80 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <button className="gallery-prev absolute left-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer shadow-lg">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button className="gallery-next absolute right-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer shadow-lg">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm md:max-w-md"
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white hover:text-[#00b4d8] transition-colors z-10"
              >
                <HiX className="text-4xl" />
              </button>

              {/* Counter */}
              <p className="absolute -top-12 left-0 text-gray-400 text-sm">
                {selectedIndex + 1} / {validImages.length}
              </p>

              {/* ✅ 4:5 lightbox with next/image */}
              <div
                className="relative rounded-2xl overflow-hidden bg-black w-full"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 448px"
                  priority // ✅ lightbox image loads immediately
                />
              </div>

              {/* Info */}
              <div className="mt-4 text-center">
                <p className="text-white text-xl font-semibold">{selectedImage.title}</p>
                <p className="text-[#00b4d8] text-sm mt-1">{selectedImage.category}</p>
              </div>

              {/* Lightbox Prev/Next */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors shadow-lg"
              >
                <HiChevronLeft className="text-2xl text-black" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors shadow-lg"
              >
                <HiChevronRight className="text-2xl text-black" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}