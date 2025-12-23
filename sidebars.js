// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Professional documentation structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Projects',
      items: [
        'projects/web-development',
      ],
    },
    {
      type: 'category',
      label: '💻 Development',
      items: [
        'development/react-best-practices',
      ],
    },
    {
      type: 'category',
      label: '📚 Learning Notes',
      items: [
        'learning/javascript-es6',
      ],
    },
    {
      type: 'category',
      label: '🛠️ Resources',
      items: [
        'templates',
      ],
    },
    'showcase',
    'learn',
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
