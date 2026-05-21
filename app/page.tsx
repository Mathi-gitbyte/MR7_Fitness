import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import VideoSection from "@/components/sections/VideoSection";
import Instructors from "@/components/sections/Instructors";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { getPricingPlans, getGalleryItems, getStoryVideos, getInstructors, getHeroMedia } from "@/lib/data";

export default async function Home() {
  const [plans, gallery, videos, instructorsData, heroMedia] = await Promise.all([
    getPricingPlans(),
    getGalleryItems(),
    getStoryVideos(),
    getInstructors(),
    getHeroMedia(),
  ]);
  const { enabled: instructorsEnabled, instructors } = instructorsData;

  return (
    <>
      <Navbar />
      <HeroSection heroMedia={heroMedia} />
      <Courses />
      <Gallery items={gallery} />
      <Pricing plans={plans} />
      <VideoSection videos={videos} />
      {instructorsEnabled && <Instructors instructors={instructors} />}
      <Contact />
      <About />
      <Footer />
    </>
  );
}
