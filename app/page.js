import Footer from "@/components/layout/Footer";
import Apply from "@/components/sections/Apply";
import Audience from "@/components/sections/Audience";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Mentorship from "@/components/sections/Mentorship";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import WhyBalaLabs from "@/components/sections/WhyBalaLabs";


export default function Home() {
  return (
    <main>
      <Hero />
      <Audience />
      <Testimonials />
      <Journey />
      <Mentorship />
      <WhyBalaLabs />
      <Pricing />
      <FAQ />
      <Apply />
      <Footer />
    </main>
  );
}
