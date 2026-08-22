import { useState } from "react";
import { SiteHeader } from "@/components/ui/header.jsx";
import { SiteFooter } from "@/components/ui/footer.jsx";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsData } from "@/components/ui/projectdata";
import "@/css/projects.css";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [
    "All Projects",
    "Carpentry",
    "PVC Panelling",
    "Aluminium & Glass",
    "Wood Polishing",
    "Welding",
  ];

  const filteredProjects =
    activeCategory === "All Projects"
      ? projectsData
      : projectsData.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const getCategoryClass = (cat) => {
    switch (cat) {
      case "Carpentry":
        return "badge-carpentry";
      case "Wood Polishing":
        return "badge-wood-polishing";
      case "Aluminium & Glass":
        return "badge-aluminium-glass";
      case "PVC Panelling":
        return "badge-pvc-panelling";
      case "Welding":
        return "badge-welding";
      default:
        return "badge-default";
    }
  };

  return (
    <div className="projects-page">
      <SiteHeader />

      <main className="projects-main">
        <section className="projects-hero-section">
          <div className="projects-hero-container">
            <h1>Our Recent Projects</h1>
            <p>
              Discover our craftsmanship in home maintenance and improvement
              across Islamabad and nearby areas.
            </p>

            <div className="projects-filter-bar">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-grid-section">
          <div className="projects-grid-container">
            <div className="projects-grid">
              {currentProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image-wrapper">
                    <span className={`project-category-badge ${getCategoryClass(project.category)}`}>
                      {project.category}
                    </span>
                    <img src={project.image} alt={project.title} />
                  </div>

                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-location">
                      <MapPin className="location-icon" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="projects-pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      className={`page-number-btn ${
                        currentPage === number ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="projects-cta-section">
          <div className="projects-cta-container">
            <h2>Inspired by our work? Request a service for your home today.</h2>
            <Button asChild className="projects-cta-button">
              <a href="/services">Request a Service</a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}