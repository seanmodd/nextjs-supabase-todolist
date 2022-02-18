import { useContext } from 'react';
// import { AuthContext } from '../contexts/JWTContext';
import { AuthContext } from 'src/mui/contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
