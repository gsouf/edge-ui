import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { monaco, ControlledEditor } from '@monaco-editor/react';

monaco.config({
  paths: {
    vs: '/vs',
  },
});

monaco.init().then((monaco) => {
  // register edgeql syntax
  monaco.languages.register({ id: 'edgeql' });
  // set completion
  monaco.languages.registerCompletionItemProvider('edgeql', {
    provideCompletionItems: function (model, position) {
      // TODO make a real completion that understands the code
      const keywords = [
        'SELECT',
        'FILTER',
        'LIMIT',
        'UNION',
        'INSERT',
        'UPDATE',
        'SET',
        'WITH',
        'EXITS',
        'IN',
        'IS',
        'DELETE',
        'CREATE',
        'FUNCTION',
        'USING',
        'abstract',
        'type',
        'extending',
      ];
      const suggestions = keywords.map((k) => ({
        label: k,
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: `${k} `,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.KeepWhitespace,
      }));
      return { suggestions };
    },
  });
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
  })
);

export default function CodeEditor(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ControlledEditor
        language="edgeql"
        height="15rem"
        width="100%"
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        value={props.text}
        onChange={(ev, value) => {
          props.setText(value);
        }}
        editorDidMount={(_, editor) => {
          editor.onKeyDown((e) => {
            if (props.requestSubmit && e.ctrlKey && e.keyCode === 3) {
              e.preventDefault();
              e.stopPropagation();
              props.requestSubmit(editor.getValue());
            }
          });
        }}
      />
    </div>
  );
}

CodeEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  requestSubmit: PropTypes.func,
};
