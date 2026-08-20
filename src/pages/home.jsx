import { SiteHeader } from "@/components/ui/header.jsx";
import { SiteFooter } from "@/components/ui/footer.jsx";
import { Button } from "@/components/ui/button";
import { MapPin, ShieldCheck, Wrench, Clock, Building2, ArrowRight } from "lucide-react";
import heroImage from "@/assets/aboutsideparaimage.jpg";
import carpentryImg from "@/assets/carpentry.png";
import pvcImg from "@/assets/pvspanelling.png";
import aluminiumImg from "@/assets/aluminiumandglass.png";
import woodPolishImg from "@/assets/polishing.png";
import weldingImg from "@/assets/welding.png";
import "@/css/home.css";

export default function Home() {
  return (
    <div className="resicare-home-page">
      <SiteHeader />

      <main className="home-main">
        <section className="hero-section hero-split">
          <div className="hero-container">
            <div className="hero-content">

              <h1>Professional Home Care in Islamabad</h1>
              <p>
                From bespoke carpentry to structural welding — ResiCare provides reliable, high-end maintenance services. Experience architectural craftsmanship you can trust.
              </p>
              <div className="hero-cta-group">
                <Button asChild className="btn-primary">
                  <a href="/request-service">
                    REQUEST A SERVICE <ArrowRight size={16} />
                  </a>
                </Button>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img src={heroImage} alt="Luxury Interior Architecture" />
            </div>
          </div>
        </section>

        <section className="trust-section trust-bar">
          <div className="trust-container">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={24} />
              <div>
                <h4>PROFESSIONAL</h4>
                <p>Vetted Experts</p>
              </div>
            </div>
            <div className="trust-item">
              <Wrench className="trust-icon" size={24} />
              <div>
                <h4>CRAFTSMANSHIP</h4>
                <p>Precision & Detail</p>
              </div>
            </div>
            <div className="trust-item">
              <Clock className="trust-icon" size={24} />
              <div>
                <h4>RELIABLE</h4>
                <p>Punctual Service</p>
              </div>
            </div>
            <div className="trust-item">
              <Building2 className="trust-icon" size={24} />
              <div>
                <h4>ISLAMABAD</h4>
                <p>Local Knowledge</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="section-header">
            <h2>Premium Services</h2>
            <p>Expertise across critical home maintenance disciplines, delivered with unmatched architectural professionalism.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-img-wrapper">
                <img src={carpentryImg} alt="Carpentry" />
              </div>
              <div className="service-content">
                <h3>Carpentry</h3>
                <p>Custom woodwork, repairs, and bespoke installations tailored to your architectural space.</p>

              </div>
            </div>

            <div className="service-card">
              <div className="service-img-wrapper">
                <img src={pvcImg} alt="PVC Panelling" />
              </div>
              <div className="service-content">
                <h3>PVC Panelling</h3>
                <p>Durable, aesthetic wall and ceiling solutions for refined modern interiors.</p>

              </div>
            </div>

            <div className="service-card">
              <div className="service-img-wrapper">
                <img src={aluminiumImg} alt="Aluminium & Glass" />
              </div>
              <div className="service-content">
                <h3>Aluminium & Glass</h3>
                <p>Precision framing, minimalist windows, and custom glass partitions.</p>

              </div>
            </div>

            <div className="service-card">
              <div className="service-img-wrapper">
                <img src={woodPolishImg} alt="Wood Polishing" />
              </div>
              <div className="service-content">
                <h3>Wood Polishing</h3>
                <p>Restoring natural beauty and deep luster to your premium wooden assets.</p>

              </div>
            </div>

            <div className="service-card">
              <div className="service-img-wrapper">
                <img src={weldingImg} alt="Welding" />
              </div>
              <div className="service-content">
                <h3>Welding</h3>
                <p>Secure, high-strength structural and architectural decorative metalwork.</p>

              </div>
            </div>
          </div>
        </section>
        <section className="process-section">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>
              A simple and professional process from your first inquiry to completed work.
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <span className="step-number">1</span>
              <h3>Inquiry</h3>
              <p>Tell us what service you need.</p>
            </div>

            <div className="process-step">
              <span className="step-number">2</span>
              <h3>Provide Details</h3>
              <p>Share your location and work requirements.</p>
            </div>

            <div className="process-step">
              <span className="step-number">3</span>
              <h3>We Contact You</h3>
              <p>Our team contacts you to discuss the work in detail.</p>
            </div>

            <div className="process-step">
              <span className="step-number">4</span>
              <h3>Estimate</h3>
              <p>We discuss the requirements and provide an estimate.</p>
            </div>

            <div className="process-step">
              <span className="step-number">5</span>
              <h3>Professional Service</h3>
              <p>Our team completes the work with care and professionalism.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}