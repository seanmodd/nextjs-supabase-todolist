import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <h1>Sample Tetxt</h1>
      <h1 className="aktiv-grotesk">Aktiv Grotesk Sample Text</h1>
      <h1 className="neue-haas">Neue dHaas Display Sample Text</h1>
      <h1 className="neue-haas-text">Neue Haas Display Sample Text</h1>
      <h1 className="eurostile">euro</h1>

      <h1 className="forma-djr">forma</h1>
      <h1 className="nimbus-sans-condensed">forma</h1>
      <h1 className="nimbus-sans-extended">forma</h1>
      <h1 className="forma-djr-text">forma</h1>

      <h1 className="mono45">Sample Text</h1>

      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
