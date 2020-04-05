import React from 'react';
import CodeEditor from './CodeEditor';

export default {
  title: 'Code Editor',
  component: CodeEditor,
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <div style={{ margin: '3rem' }}>
    <CodeEditor />
  </div>
);
