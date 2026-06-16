import Navbar from '@/components/Navbar';
import HeroHeader from '@/components/HeroHeader';
import VideoSlider from '@/components/VideoSlider';
import ImageSlider from '@/components/ImageSlider';
import Pricing from '@/components/Pricing';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="w-full bg-[#0a0a0a]">
      <Navbar />
      <HeroHeader />
      <VideoSlider />
      <ImageSlider />
      <Pricing />
      <Reviews />
      <Footer />
    </main>
  );
}
