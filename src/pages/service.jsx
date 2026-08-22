import { useState } from "react";
import emailjs from "@emailjs/browser";
import { SiteHeader } from "@/components/ui/header.jsx";
import { SiteFooter } from "@/components/ui/footer.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CheckCircle,
  ArrowLeft,
  Send,
  ShieldCheck,
} from "lucide-react";
import "@/css/service.css";

const subcategoriesMap = {
  Carpentry: [
    "Door Work",
    "Wardrobe Work",
    "Kitchen Cabinets",
    "Furniture Repair",
    "Custom Furniture",
    "Wooden Partitions",
    "Shelving",
    "Other Carpentry Work",
  ],
  "PVC Panelling": [
    "Wall PVC Panelling",
    "Ceiling PVC Panelling",
    "Decorative Wall Panels",
    "Bathroom PVC Panelling",
    "Kitchen PVC Panelling",
    "Waterproof Panelling",
    "Other PVC Work",
  ],
  "Aluminium & Glass Work": [
    "Glass Door",
    "Aluminium Door",
    "Glass Window",
    "Aluminium Window",
    "Glass Partition",
    "Aluminium Partition",
    "Glass Railing",
    "Terrace Railing",
    "Shower Glass",
    "Office Glass Work",
    "Balcony Glass Work",
    "Custom Glass Work",
    "Other Aluminium & Glass Work",
  ],
  "Wood Polishing": [
    "Door Polishing",
    "Furniture Polishing",
    "Cabinet Polishing",
    "Wardrobe Polishing",
    "Wooden Floor Polishing",
    "Wood Restoration",
    "Lacquer Finish",
    "Matt Finish",
    "Gloss Finish",
    "Other Wood Polishing",
  ],
  Welding: [
    "Main Gate",
    "Iron Gate",
    "Window Grills",
    "Safety Grills",
    "Stair Railing",
    "Terrace Railing",
    "Balcony Railing",
    "Metal Frame",
    "Custom Welding",
    "Repair Work",
    "Other Welding Work",
  ],
};

export default function Service() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: "Carpentry",
    serviceSubcategory: subcategoriesMap.Carpentry[0],
    city: "Islamabad",
    sector: "F-7",
    streetAddress: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "serviceCategory") {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: value,
        serviceSubcategory: subcategoriesMap[value]
          ? subcategoriesMap[value][0]
          : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    if (!formData.city.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your city.",
      });
      return;
    }

    if (!formData.sector.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your sector or area.",
      });
      return;
    }

    if (!formData.streetAddress.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your complete street address.",
      });
      return;
    }

    if (!formData.description.trim()) {
      setStatus({
        type: "error",
        message: "Please describe the work you need.",
      });
      return;
    }

    try {
      setLoading(true);

      const fullLocationString = `${formData.streetAddress}, Sector/Area: ${formData.sector}, City: ${formData.city}`;
      const fullServiceString = `${formData.serviceCategory} - ${formData.serviceSubcategory}`;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_SERVICE_REQUEST_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: fullServiceString,
          location: fullLocationString,
          description: formData.description,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus({
        type: "success",
        message:
          "Your service request has been sent successfully. We will contact you soon.",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);

      setStatus({
        type: "error",
        message: "Unable to send your service request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = () => {
    setSubmitted(false);

    setStatus({
      type: "",
      message: "",
    });

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      serviceCategory: "Carpentry",
      serviceSubcategory: subcategoriesMap.Carpentry[0],
      city: "Islamabad",
      sector: "F-7",
      streetAddress: "",
      description: "",
    });
  };

  return (
    <div className="request-service-page">
      <SiteHeader />

      <main className="request-main">
        <section className="request-hero-section">
          <div className="location-tag">
            <MapPin size={15} />
            Islamabad & Nearby Areas
          </div>

          <h1>Request a Service</h1>

          <p>
            Tell us what you need and where you are located. Our master
            craftsmen are ready to assist you.
          </p>
        </section>

        <section className="request-content-section">
          <div className="request-layout-container">
            <div className="request-form-wrapper">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="service-request-form"
                >
                  <div className="form-group-block">
                    <h3>Service Details</h3>

                    <div className="form-field">
                      <label htmlFor="serviceCategory">
                        Service Category *
                      </label>

                      <select
                        id="serviceCategory"
                        name="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={handleChange}
                        className="form-select-native"
                        required
                      >
                        <option value="Carpentry">Carpentry</option>
                        <option value="PVC Panelling">
                          PVC Panelling
                        </option>
                        <option value="Aluminium & Glass Work">
                          Aluminium & Glass Work
                        </option>
                        <option value="Wood Polishing">
                          Wood Polishing
                        </option>
                        <option value="Welding">Welding</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="serviceSubcategory">
                        Type of Work *
                      </label>

                      <select
                        id="serviceSubcategory"
                        name="serviceSubcategory"
                        value={formData.serviceSubcategory}
                        onChange={handleChange}
                        className="form-select-native"
                        required
                      >
                        {subcategoriesMap[
                          formData.serviceCategory
                        ]?.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group-block">
                    <h3>Location Details</h3>

                    <p className="section-note">
                      📍 Enter your city, sector/area, and full address.
                    </p>

                    <div className="form-row-2">
                      <div className="form-field">
                        <label htmlFor="city">City *</label>

                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Islamabad & nearby"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="sector">
                          Sector / Area *
                        </label>

                        <Input
                          id="sector"
                          name="sector"
                          type="text"
                          placeholder="e.g. F-7, Bahria Town"
                          value={formData.sector}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="streetAddress">
                        Complete Address *
                      </label>

                      <Input
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        placeholder="House/Flat No, Street, Phase"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-block">
                    <h3>Contact Information</h3>

                    <div className="form-row-2">
                      <div className="form-field">
                        <label htmlFor="fullName">
                          Full Name *
                        </label>

                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="phone">
                          Phone Number *
                        </label>

                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="03XX XXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">
                        Email Address *
                      </label>

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-block">
                    <h3>Work Details</h3>

                    <div className="form-field">
                      <label htmlFor="description">
                        Tell us about the work *
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        placeholder="Briefly describe what you need, the problem, approximate size, or any important details..."
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>
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
                    className="submit-request-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      "Sending Request..."
                    ) : (
                      <>
                        Send Service Request
                        <Send size={17} />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="success-card">
                  <CheckCircle
                    className="success-icon"
                    size={58}
                  />

                  <h2>Request Sent Successfully!</h2>

                  <p>
                    Thank you for contacting ResiCare. We have received
                    your service request. We will contact you soon.
                  </p>

                  <div className="request-summary-box">
                    <div className="summary-item">
                      <strong>Service:</strong>{" "}
                      {formData.serviceCategory} (
                      {formData.serviceSubcategory})
                    </div>

                    <div className="summary-item">
                      <strong>Location:</strong>{" "}
                      {formData.sector}, {formData.city}
                    </div>

                    <div className="summary-item">
                      <strong>Customer Name:</strong>{" "}
                      {formData.fullName}
                    </div>

                    <div className="summary-item">
                      <strong>Phone:</strong>{" "}
                      {formData.phone}
                    </div>

                    <div className="summary-item">
                      <strong>Request ID:</strong>{" "}
                      {`#RC-${Math.floor(
                        1000 + Math.random() * 9000
                      )}`}
                    </div>
                  </div>

                  <div className="success-actions">
                    <Button
                      type="button"
                      onClick={handleNewRequest}
                      className="btn-secondary"
                      style={{padding:"5px", borderradius:"2px"}}                    >
                      <ArrowLeft size={17} />
                      Submit Another Request
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <aside className="request-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <ShieldCheck className="sidebar-header-icon" />
                  <h3>Guaranteed Craftsmanship</h3>
                </div>

                <p>
                  All our professionals are vetted, highly trained, and
                  committed to premium quality standards across Islamabad
                  and surrounding regions.
                </p>
              </div>

              <div className="sidebar-card workflow-sidebar-card">
                <h3>How It Works</h3>

                <div className="workflow-step">
                  <div className="wf-number">1</div>

                  <div className="wf-content">
                    <h4>Submit Request</h4>
                    <p>
                      Fill out the form with your service details.
                    </p>
                  </div>
                </div>

                <div className="workflow-step">
                  <div className="wf-number">2</div>

                  <div className="wf-content">
                    <h4>Get an Estimate</h4>
                    <p>
                      We'll review your details and contact you
                      shortly.
                    </p>
                  </div>
                </div>

                <div className="workflow-step">
                  <div className="wf-number">3</div>

                  <div className="wf-content">
                    <h4>Job Done</h4>
                    <p>
                      Our expert arrives and completes the work.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}