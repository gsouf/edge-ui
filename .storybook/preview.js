import React from 'react';
import { addDecorator } from '@storybook/react';
import { dark } from 'component/app/theme';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// addons
import '@storybook/addon-console';

const uiTheme = createMuiTheme(dark);

addDecorator((storyFn) => (
  <ThemeProvider theme={uiTheme}>
    <CssBaseline />
    {storyFn()}
  </ThemeProvider>
));
