import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
// hooks
import useAuth from 'src/mui/hooks/useAuth';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // return <Navigate href={PATH_DASHBOARD.root} />;

    return (
      <>
        {/* <Navigate href={PATH_DASHBOARD.root} /> */}
        <button style={{ backgroundColor: '#ff0000' }}>Logout?</button>
        {children}
      </>
    );
  }

  return (
    <>
      {/* <Navigate href={PATH_DASHBOARD.root} /> */}
      <button style={{ backgroundColor: '#ff0000' }}>
        Login! Still Guest currently.
      </button>
      {children}
    </>
  );

  return <>{children}</>;
}
