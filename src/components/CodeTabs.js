import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './CodeTabs.module.css';

const CodeTabs = ({ tabs }) => {
  const tabKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);

  return (
    <div className={styles.codeTabs}>
      <div className={styles.tabBar}>
        {tabKeys.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.codeBlock}>
        <CodeBlock language={activeTab.toLowerCase()}>
          {tabs[activeTab]}
        </CodeBlock>
      </div>
    </div>
  );
};

export default CodeTabs;
