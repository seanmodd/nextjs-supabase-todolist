import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { IconButton } from '@mui/material';
//
import { IconButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }, ref) => (
  <IconButtonAnimate>
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  </IconButtonAnimate>
));

MIconButton.propTypes = {
  children: PropTypes.node,
};

export default MIconButton;
