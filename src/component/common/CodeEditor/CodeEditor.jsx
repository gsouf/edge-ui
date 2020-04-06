import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

// code mirror theming
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

/**
 * IMPORTANT NOTE:
 *   we use a class component because react-codemirror2 is loosing props references that we give to him.
 *   Using a class components allows to pass `this` as reference and `this.props` carries the right version of props
 */
export default class CodeEditor extends React.Component {
  /**
   * On submit listen from ctrl+enter
   * @param editor
   * @param e
   */
  onEditorSubmit = (editor, e) => {
    if (this.props.requestSubmit && e.ctrlKey && e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.requestSubmit(this.props.text);
    }
  };

  render() {
    return (
      <div>
        <CodeMirror
          value={this.props.text}
          onBeforeChange={(editor, data, value) => {
            this.props.setText(value);
          }}
          options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: 'true',
          }}
          onKeyDown={this.onEditorSubmit}
        />
      </div>
    );
  }
}

CodeEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  requestSubmit: PropTypes.func,
};
