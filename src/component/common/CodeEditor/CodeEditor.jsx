import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { monaco, ControlledEditor } from '@monaco-editor/react';

monaco.config({
  urls: {
    monacoLoader: '/monaco-editor/loader.js',
    monacoBase: '/monaco-editor',
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
  })
);

export default function CodeEditor(props) {
  const classes = useStyles();
  const [text, setText] = useState('default');

  return (
    <div className={classes.root}>
      <ControlledEditor
        language="javascript"
        height="15rem"
        width="100%"
        theme="dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        value={text}
        onChange={(ev, value) => {
          setText(value);
        }}
      />
    </div>
  );
}

CodeEditor.propTypes = {};
