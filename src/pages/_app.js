import lightTheme from 'src/styles/theme/lightTheme';
import createEmotionCache from 'src/styles/theme/utility/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import '../styles/index.css';

const clientSideEmotionCache = createEmotionCache();
export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
        </Auth.UserContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
