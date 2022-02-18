import { useContext } from 'react';
import { CollapseDrawerContext } from 'src/mui/contexts/CollapseDrawerContext';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
