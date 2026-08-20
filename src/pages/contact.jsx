import { useState } from "react";
import { SiteHeader } from "@/components/ui/header.jsx";
import { SiteFooter } from "@/components/ui/footer.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { submitContactForm } from "@/api/contactapi";
import "@/css/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (!formData.fullName.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your full name.",
      });
      return;
    }

    if (!formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!formData.phone.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your phone number.",
      });
      return;
    }

    if (!formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your message.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await submitContactForm(formData);

      setStatus({
        type: "success",
        message:
          response.message || "Your message has been sent successfully.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <SiteHeader />

      <main className="contact-main">
        <section className="contact-hero">
          <div className="contact-container">
            <div className="contact-intro">
              <h1>Get in Touch</h1>
              <p>
                Ready to elevate your home? Contact ResiCare Pro for premium
                residential services in Islamabad and surrounding areas. Our
                experts are ready to assist you.
              </p>
            </div>

            <div className="contact-content">
              <div className="contact-info-column">
                <div className="contact-info-card">
                  <h2>Contact Details</h2>

                  <div className="contact-detail">
                    <div className="contact-detail-icon">
                      <Phone size={22} strokeWidth={1.8} />
                    </div>
                    <div className="contact-detail-content">
                      <span>PHONE</span>
                      <p>+92 300 1234567</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail-icon">
                      <Mail size={22} strokeWidth={1.8} />
                    </div>
                    <div className="contact-detail-content">
                      <span>EMAIL</span>
                      <p>info@resicarepro.pk</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail-icon">
                      <MapPin size={22} strokeWidth={1.8} />
                    </div>
                    <div className="contact-detail-content">
                      <span>SERVICE AREA</span>
                      <p>Serving Islamabad & Nearby Areas</p>
                    </div>
                  </div>
                </div>

                <div className="contact-map-card">
                  <div className="contact-map">
                    <div className="map-grid"></div>

                    <div className="map-pin pin-one">●</div>
                    <div className="map-pin pin-two">●</div>
                    <div className="map-pin pin-three">●</div>

                    <div className="map-label">Islamabad</div>
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                <h2>Send us a Message</h2>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="fullName">Full Name</label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="email">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="phone">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {status.message && (
                    <div
                      className={`contact-status ${
                        status.type === "success"
                          ? "contact-success"
                          : "contact-error"
                      }`}
                    >
                      {status.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="contact-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message ➤"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}