'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { HiPlay, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { videosData } from '@/data/videosData';

export default function VideoSlider() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalVideoRef = useRef(null);
  const slideVideoRefs = useRef([]);

  // ✅ Only play center slide, pause all others
  useEffect(() => {
    slideVideoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIndex) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIndex]);

  // ✅ Auto play modal video when opens
  useEffect(() => {
    if (selectedVideo && modalVideoRef.current) {
      modalVideoRef.current.load();
      modalVideoRef.current.play();
    }
  }, [selectedVideo]);

  const handleClose = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
  };

  return (
    <section id="videos" className="py-24 bg-[#0a0a0a] px-4 md:px-0">
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
            Our Video Work
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00b4d8] to-transparent mx-auto" />
        </motion.div>

        {/* Video Slider */}
        <div className="relative px-14">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.video-next',
              prevEl: '.video-prev',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-10"
          >
            {videosData.map((video, index) => (
              <SwiperSlide key={video.id}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group flex justify-center"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-[#111827] cursor-pointer w-full max-w-[300px] transition-all duration-500 ${
                        isActive
                          ? 'scale-100 opacity-100 shadow-2xl shadow-[#00b4d8]/20'
                          : 'scale-90 opacity-60'
                      }`}
                      style={{ aspectRatio: '9/16' }}
                      onClick={() => setSelectedVideo(video)}
                    >
                      {/* ✅ preload="none" for non-active, metadata for active = saves bandwidth */}
                      <video
                        ref={(el) => (slideVideoRefs.current[index] = el)}
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        loop
                        preload={isActive ? 'metadata' : 'none'} // ✅ key fix - don't load all videos
                        onLoadedMetadata={(e) => {
                          e.target.currentTime = 0;
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Play Button - non active slides */}
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#00b4d8]/80 flex items-center justify-center shadow-lg shadow-[#00b4d8]/30">
                            <HiPlay className="text-2xl text-black ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Tap to watch label */}
                      {isActive && (
                        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                          <span className="text-xs text-[#00b4d8] bg-black/50 px-3 py-1 rounded-full">
                            Tap to watch full
                          </span>
                        </div>
                      )}

                      {/* Active ring */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-[#00b4d8] pointer-events-none" />
                      )}
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <button className="video-prev absolute left-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button className="video-next absolute right-0 top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#00b4d8] hidden md:flex items-center justify-center hover:bg-[#0077b6] transition-colors cursor-pointer">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white hover:text-[#00b4d8] transition-colors z-10"
              >
                <HiX className="text-4xl" />
              </button>

              {/* Video Title */}
              <h3 className="text-white text-xl font-semibold mb-3 ml-1">
                {selectedVideo.title}
              </h3>

              {/* Reel size modal video */}
              <div
                className="w-full rounded-2xl overflow-hidden bg-black"
                style={{ aspectRatio: '9/16' }}
              >
                <video
                  ref={modalVideoRef}
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  onEnded={handleClose}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}