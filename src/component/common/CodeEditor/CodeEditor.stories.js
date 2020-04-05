import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Query / Code Editor',
  component: CodeEditor,
  excludeStories: /.*Data$/,
};

const ControlledCodeEditor = () => {
  const [text, setText] = useState('default');

  return (
    <CodeEditor
      text={text}
      setText={(newText) => {
        action('setText')(newText);
        setText(newText);
      }}
      requestSubmit={(txt) => {
        action('requestSubmit')(txt);
      }}
    />
  );
};

export const Default = () => (
  <div style={{ margin: '3rem' }}>
    <ControlledCodeEditor />
  </div>
);
