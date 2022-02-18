import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// hooks
import useSettings from './src/mui/hooks/useSettings';
//
import shape from './src/styles/theme/shape';
import palette from './src/styles/theme/palette';
import typography from './src/styles/theme/typography';
import breakpoints from './src/styles/theme/breakpoints';
import componentsOverride from './src/styles/theme/overrides';
import shadows, { customShadows } from './src/styles/theme/shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
