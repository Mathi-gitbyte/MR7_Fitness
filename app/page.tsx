import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import VideoSection from "@/components/sections/VideoSection";
import Instructors from "@/components/sections/Instructors";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Services />
      <About />
      <Courses />
      <Gallery />
      <Pricing />
      <VideoSection />
      <Instructors />
      <Contact />
      <Footer />
    </>
  );
}
