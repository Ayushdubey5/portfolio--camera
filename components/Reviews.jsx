'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ReviewCard from './ReviewCard';
import { reviewsData } from '@/data/reviewsData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#111827] px-4 md:px-0">
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
            What Our Clients Say
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00b4d8] to-transparent mx-auto"></div>
        </motion.div>

        {/* Reviews Slider Wrapper */}
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
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.reviews-next',
              prevEl: '.reviews-prev',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-12"
          >
            {reviewsData.map((review, index) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <button className="reviews-prev absolute left-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer shadow-lg">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button className="reviews-next absolute right-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer shadow-lg">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}