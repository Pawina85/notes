import React, { useState } from "react";
import styles from "./CodeTabs.module.css";

export default function CodeTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
    <div className={styles.codeTabs}>`
     <div className={styles.tabHeader}>
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <pre className={styles.codeBlock}>
        <code>{tabs[activeTab]}</code>
      </pre>
    </div>
  );
}
   