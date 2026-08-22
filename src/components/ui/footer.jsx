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
          <h3>QUICK LINKS</h3>
          <div>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/service">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="site-footer-column">
          <h3>SERVICES</h3>
          <div>
            <Link to="/service">Carpentry</Link>
            <Link to="/service">PVC Panelling</Link>
            <Link to="/service">Aluminium & Glass</Link>
            <Link to="/service">Wood Polishing</Link>
            <Link to="/service">Welding</Link>
          </div>
        </div>
      </div>

      <hr />

      <div className="site-footer-bottom">
        © 2026 ResiCare Pro Islamabad. All rights reserved. Professional Home
        Maintenance Excellence.
      </div>
    </footer>
  );
}