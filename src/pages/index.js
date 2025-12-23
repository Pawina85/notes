import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title="Pawina's Knowledge Hub"
      description="A personal documentation and knowledge sharing platform"
    >
      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to My Professional Knowledge Hub</h1>
          <p className={styles.heroSubtitle}>
            Explore my projects, technical documentation, learning notes, and professional insights. 
            This is where I document my journey in software development and share valuable resources.
          </p>

          <div className={styles.heroButtons}>
            <Link className={styles.primaryBtn} to="/docs/intro">
              Explore Documentation →
            </Link>
            <Link className={styles.secondaryBtn} to="/docs/showcase">
              View Projects
            </Link>
          </div>
        </div>
      </main>

      <section className={styles.featuresSection}>
        <h2 className="dog-heading-xl">What You'll Find Here</h2>
        <p className="dog-subtitle">
          A comprehensive collection of my professional work, learning journey, and technical insights.
        </p>

        <div className="dog-grid" style={{ marginTop: "2rem" }}>
          <div className="dog-card">
            <div className="dog-card-title">📚 Technical Documentation</div>
            <p className="dog-card-body">
              Detailed guides, tutorials, and technical references from my development work.
            </p>
          </div>

          <div className="dog-card">
            <div className="dog-card-title">🚀 Project Showcase</div>
            <p className="dog-card-body">
              Real-world projects with code examples, architecture decisions, and lessons learned.
            </p>
          </div>

          <div className="dog-card">
            <div className="dog-card-title">💡 Learning Notes</div>
            <p className="dog-card-body">
              My continuous learning journey with new technologies, frameworks, and best practices.
            </p>
          </div>

          <div className="dog-card">
            <div className="dog-card-title">🛠️ Resources & Templates</div>
            <p className="dog-card-body">
              Reusable code snippets, project templates, and tools that make development faster.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
