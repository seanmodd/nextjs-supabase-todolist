import lightTheme from 'src/styles/theme/lightTheme';
import createEmotionCache from 'src/mui/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, NoSsr } from '@mui/material';
import { Auth } from '@supabase/ui';
import ThemeConfig from 'themeConfig';
import '../styles/index.css';
import { wrapperStore } from 'src/___redux/store';
import GlobalStyles from 'src/styles/theme/globalStyles';
// require('dotenv').config();

import { getApolloClient } from 'src/graphql/data/apollo';
import { HelmetProvider } from 'react-helmet-async';
import NotistackProvider from 'src/mui/utils/NotistackProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ApolloWrapper } from 'src/graphql/ApolloWrapper';
import MainLayout from 'src/mui/layouts/main';
import { ApolloProvider } from '@apollo/client';
import { store, persistor } from 'src/___redux/customStore';
import ThemePrimaryColor from 'src/mui/components/ThemePrimaryColor';
import Settings from 'src/mui/components/settings';
import RtlLayout from 'src/mui/components/RtlLayout';
import ProgressBar from 'src/mui/components/ProgressBar';
import { UserWrapper, FeedbackWrapper, CartWrapper } from 'src/mui/contexts';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { supabase } from '../lib/initSupabase';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const client = getApolloClient();
  return (
    <HelmetProvider>
      <PersistGate
        // loading={<LoadingScreen />}
        persistor={persistor}
      >
        <ApolloProvider client={client}>
          <Auth.UserContextProvider supabaseClient={supabase}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CacheProvider value={emotionCache}>
                <FeedbackWrapper>
                  <UserWrapper>
                    <CartWrapper>
                      <ThemeConfig>
                        <NotistackProvider>
                          <ThemeProvider theme={lightTheme}>
                            <ThemePrimaryColor>
                              <RtlLayout>
                                <NoSsr>
                                  <Settings />
                                </NoSsr>
                                {/* <CssBaseline /> */}
                                <GlobalStyles />
                                <MainLayout>
                                  <Component {...pageProps} />
                                </MainLayout>
                              </RtlLayout>
                            </ThemePrimaryColor>
                          </ThemeProvider>
                        </NotistackProvider>
                      </ThemeConfig>
                    </CartWrapper>
                  </UserWrapper>
                </FeedbackWrapper>
              </CacheProvider>
            </LocalizationProvider>
          </Auth.UserContextProvider>
        </ApolloProvider>
        {/* </ReduxProvider> */}
      </PersistGate>
    </HelmetProvider>
  );
};

export default wrapperStore.withRedux(MyApp);
