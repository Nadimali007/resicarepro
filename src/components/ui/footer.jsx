import { Link } from "react-router-dom";
import "@/css/footer.css";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <div className="site-footer-brand">
          <span>ResiCare Pro</span>
          <p>
            Professional Home Maintenance Excellence in Islamabad.
          </p>
        </div>

        <div className="site-footer-column">
          <h3>COMPANY</h3>
          <div>
            <Link to="/services">Services</Link>
            <Link to="/about">Company</Link>
            <Link to="/contact">Customer Support</Link>
          </div>
        </div>

        <div className="site-footer-column">
          <h3>LEGAL</h3>
          <div>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="site-footer-bottom">
        © 2024 ResiCare Islamabad. All rights reserved. Professional Home
        Maintenance Excellence.
      </div>
    </footer>
  );
}