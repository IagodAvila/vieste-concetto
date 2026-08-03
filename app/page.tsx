import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Benefits } from "@/components/sections/Benefits";
import { Campaign } from "@/components/sections/Campaign";
import { Editorial } from "@/components/sections/Editorial";
import { Hero } from "@/components/sections/Hero";
import { Lines } from "@/components/sections/Lines";
import { Newsletter } from "@/components/sections/Newsletter";
import { NewArrivals } from "@/components/sections/NewArrivals";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <Hero />
      <NewArrivals />
      <Lines />
      <Campaign />
      <Benefits />
      <Editorial />
      <Newsletter />
      <Footer />
    </main>
  );
}
