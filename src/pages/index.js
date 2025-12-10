import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title="Dog Blog"
      description="A modern knowledge hub built with Docusaurus"
    >
      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>A Better Way to Document Knowledge</h1>
          <p className={styles.heroSubtitle}>
            Beautiful docs, clean UI, powerful MDX components — all powered by a
            custom design system built on Docusaurus.
          </p>

          <div className={styles.heroButtons}>
            <Link className={styles.primaryBtn} to="/docs/learn">
              Start Learning →
            </Link>
            <Link className={styles.secondaryBtn} to="/showcase">
              View Showcase
            </Link>
          </div>
        </div>
      </main>

      <section className={styles.featuresSection}>
        <h2 className="dog-heading-xl">Why Dog Blog?</h2>
        <p className="dog-subtitle">
          A documentation experience designed to feel like a real product website.
        </p>

        <div className="dog-grid" style={{ marginTop: "2rem" }}>
          <div className="dog-card">
            <div className="dog-card-title">Markdown + MDX</div>
            <p className="dog-card-body">
              The power of Markdown with the flexibility of React components.
            </p>
          </div>

          <div className="dog-card">
            <div className="dog-card-title">Custom Design System</div>
            <p className="dog-card-body">
              Typography, colors, spacing — all controlled by global CSS variables.
            </p>
          </div>

          <div className="dog-card">
            <div className="dog-card-title">Fast & Modern</div>
            <p className="dog-card-body">
              Blazing fast development with Docusaurus, but redesigned to feel unique.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
