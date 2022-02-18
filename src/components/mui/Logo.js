//! Logo page
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="logosandtypes com"
        viewBox="0 0 150 150"
      >
        <defs>
          <linearGradient
            id="a"
            x1="13.41"
            x2="135.85"
            y1="75"
            y2="75"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".01" stopColor={PRIMARY_MAIN} />
            <stop offset=".95" stopColor={PRIMARY_DARK} />
          </linearGradient>
        </defs>
        <g data-name="Layer 2">
          <path fill="none" d="M0 0h150v150H0Z" data-name="Layer 3" />
        </g>

        <path
          fill="url(#a)"
          d="M74.63 103.18c-9.47 8.93-18.42 18.56-27.87 27.56-12.85 12.83-35.76 1.19-33.14-16.81a19.67 19.67 0 0 1 5.8-11.73Q28.6 93 37.85 83.77c7.09-7.52 19.67-8.11 27.25-1C68.34 85.7 71.28 89 74.47 92l17-17-17-16.94c-3 2.88-6 6.06-9 9-7.71 7.54-20.94 6.63-28-1.35-6-6.07-12.14-12.1-18.16-18.19a19.34 19.34 0 0 1-5.65-12.71c-1.45-17.83 21.52-28 33.68-15.12 9.21 9 18.1 18.35 27.37 27.21 9.43-8.84 18.29-18.51 27.67-27.5A18.79 18.79 0 0 1 119 14.12c14.54 1.64 22 20.21 12.68 31.49-9.19 10.13-19.35 19.39-28.87 29.26 8.78 9.58 18.6 18.52 27.65 28a18.46 18.46 0 0 1 5.34 12.64 19.72 19.72 0 0 1-16.8 20.4c-7.72 1.34-14.55-2.47-19.49-8.2-8.45-8.03-16.44-16.59-24.88-24.53Zm5.48-5.58c6.16 6.27 12.42 12.4 18.61 18.63 2.77 2.77 5.55 5.51 8.29 8.3a12 12 0 0 0 10.71 3.84c9.66-.87 14.09-13.91 6.93-20.51-9.23-9-18.09-18.68-27.56-27.27Zm.25-45.23 17 17c9.14-9 18.16-18.12 27.24-27.16a11.7 11.7 0 0 0 3.16-11.62c-2.08-8.78-13.2-12.06-19.82-5.93-1.85 1.71-3.59 3.52-5.37 5.29-7.34 7.51-15.18 14.68-22.21 22.42ZM69.14 97.74l.11-.44c-3.24-2.41-5.81-5.69-8.79-8.42a11.93 11.93 0 0 0-16.71-.13C37.31 95.1 31 101.53 24.56 107.93a11.46 11.46 0 0 0-2.93 5 12 12 0 0 0 8.17 15c4.8 1.35 8.94.07 12.45-3.44 8.96-8.89 17.84-17.91 26.89-26.75Zm0-45.08c-7.19-8-15.26-15.31-22.77-23.07a65.55 65.55 0 0 0-5.78-5.65c-10.42-8-24.75 4.62-17.47 16.23 6.31 7.25 13.6 13.65 20.24 20.61a13.27 13.27 0 0 0 3.88 2.76 12.12 12.12 0 0 0 13.33-2.46c2.82-2.86 5.74-5.68 8.61-8.42Z"
          transform="translate(0 -.2)"
        />
      </svg>
    </Box>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
};

export default Logo;
