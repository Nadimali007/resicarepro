import { SiteHeader } from "@/components/ui/header.jsx";
import { SiteFooter } from "@/components/ui/footer.jsx";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ShieldCheck, Award, Wrench, Headphones,
} from "lucide-react";
import aboutImage2 from "@/assets/aboutsideparaimage.jpg";
import "@/css/about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <SiteHeader />

      <main className="about-main">

        <section className="about-hero-section">
          <div className="about-hero-container">
            <div className="about-hero-content">
              <h1>
                Building Trust
                <br />
                Through Precision
              </h1>

              <p>
                ResiCare Pro provides reliable home maintenance and improvement
                services with a focus on quality, professionalism and attention
                to detail. We treat your home with the same care and respect we
                would our own.
              </p>

              <Button asChild className="about-hero-button">
                <a href="/services">Get a Quote</a>
              </Button>
            </div>

            <div className="about-hero-image">
              <img src={aboutImage2} alt="ResiCare Pro team" />
            </div>
          </div>
        </section>

        <hr />

        <section className="about-information-section">

          <div className="about-mission-container">

            <div className="about-mission-content">
              <h2>Our Mission</h2>
              <p>To elevate the standard of residential care across Islamabad and nearby areas by delivering uncompromising quality, transparent communication, and enduring solutions. We believe that a well-maintained home is the foundation of peace of mind, which is why we approach every project—big or small—with precision, craftsmanship, and absolute respect for your living space.</p>            </div>
            <div className="about-mission-image">
              <img src={aboutImage2} alt="ResiCare Pro team" />
            </div>

          </div>

          <div className="about-vision-container">
            <div className="about-vision-image">
              <img src={aboutImage2} alt="ResiCare Pro team" />
              </div>
              <div className="about-vision-content">
              <h2>Our Vision</h2>
              <p>To be the most trusted and sought-after residential service provider in Islamabad and surrounding areas, recognized for our unwavering commitment to quality, reliability, and customer satisfaction. We envision a community where every home reflects the care and attention it deserves, and we strive to set the benchmark for excellence in residential maintenance and improvement.</p>
                </div>
            </div>

        </section>

        <section className="about-pillars-section">
          <div className="about-pillars-container">

            <div className="about-pillars-heading">
              <h2>Why Choose ResiCare Pro</h2>

              <p>
                Our foundation is built on four core pillars that guide every
                interaction and shape every outcome.
              </p>
            </div>

            <div className="about-pillars-grid">

              <div className="about-quality-card">
                <Award className="about-pillar-icon" />
                <h3>Quality</h3>
                <p>
                  Uncompromising standards in materials and craftsmanship for
                  lasting results.
                </p>
              </div>

              <div className="about-reliability-card">
                <ShieldCheck className="about-pillar-icon" />
                <h3>Reliability</h3>
                <p>
                  Punctual service and dependable execution you can trust,
                  every time.
                </p>
              </div>

              <div className="about-professionalism-card">
                <Wrench className="about-pillar-icon" />
                <h3>Professionalism</h3>
                <p>
                  Courteous, knowledgeable technicians who respect your home.
                </p>
              </div>

              <div className="about-customer-care-card">
                <Headphones className="about-pillar-icon" />
                <h3>Customer Care</h3>
                <p>
                  Dedicated support and clear communication throughout your
                  project.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}