import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Services from "../../components/landing/Services";
import Workflow from "../../components/landing/Workflow";
import AnalyticsPreview from "../../components/landing/AnalyticsPreview";
import Benefits from "../../components/landing/Benefits";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Workflow />
      <AnalyticsPreview />
      <Benefits />
      <Footer />
    </>
  );
}