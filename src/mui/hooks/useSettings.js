import { useContext } from 'react';
import { SettingsContext } from 'src/mui/contexts/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
