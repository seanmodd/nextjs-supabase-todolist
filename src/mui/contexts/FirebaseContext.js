
   
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import axios from 'axios';
import { USER_DATA } from 'src/utils/callbacks';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'src/mui/components//@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useRouter } from 'next/router';
import {
  getFavoriteList,
  removeAllFromFavoriteList,
} from 'src/utils/localstorage';
import { firebaseConfig } from 'src/config';

// require('dotenv').config({ path: path.join(__dirname, '.env') });
// require('dotenv').config();

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

//! Below is similar to src/__gatsby/auth/SignUp, copied and pasted from it here: https://github.com/seanmodd/next-carx/blob/9f07f4571b6070b262aa674c5c7d91efb7219047/src/__gatsby/auth/SignUp.js#L27-L30
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: { user },
});
//! Above is similar to src/__gatsby/auth/SignUp, copied and pasted from it here: https://github.com/seanmodd/next-carx/blob/9f07f4571b6070b262aa674c5c7d91efb7219047/src/__gatsby/auth/SignUp.js#L27-L30

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [, setUserData] = USER_DATA.useSharedState();

  const router = useRouter();

  //! Below is what links firebase authentication with strapi users I believe...
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        const axiosConfig = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        };

        if (user) {
          const docRef = firebase.firestore().collection('users').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
          axios
            .post(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/firebase/auth`,
              {
                token: user.Aa,
              },
              axiosConfig
            )
            .then((res) => {
              //   localStorage.userData = JSON.stringify(res.data.user);
              setUserData(res.data.user?.favorites);
              const strapidata = res.data;

              syncLocalFavoritesData(strapidata.jwt);
              localStorage.strapijwt = strapidata.jwt;
            });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const syncLocalFavoritesData = (strapiJWTToken) => {
    const localFavData = getFavoriteList();

    if (localFavData.length > 0) {
      localFavData?.forEach((favId) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/favorites`,
            {
              variant: favId,
            },
            {
              headers: { Authorization: `Bearer ${strapiJWTToken}` },
            }
          )
          .then((res) => {
            // console.log('RES ===>', res.data)
          })
          .catch((err) => {
            console.log('ERR ===>', err);
          });
      });
      removeAllFromFavoriteList();
    }
  };

  const login = (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        await router.push('/dashboard/shop');
        enqueueSnackbar('Logged In Successfully ', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      })
      .catch((error) => {
        enqueueSnackbar(
          'Wrong Credentials OR something went wrong, please Try again.',
          {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          }
        );
      });

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email, password, firstName, lastName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email,
            displayName: `${firstName} ${lastName}`,
          });
      });

    saveUserLocalFavoriteList();
  };

  const saveUserLocalFavoriteList = () => {
    const localStorageData = getFavoriteList();
    if (localStorageData?.length > 0) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/favorites`,
          {
            variant: localStorageData,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.strapijwt}` },
          }
        )
        .then((res) => {
          if (userData) {
            const obj = {
              id: res.data.id,
              variant: product.id,
            };
            setUserData([...userData, obj]);
          }
        })
        .catch((err) => {
          errorFavoritingSnackbar();
          updateFavoritesData(product.id);
        });
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  // Anonymous Login for Guest
  const guestLogin = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then((res) => {
        // console.log('Guest user ==>', res)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false,
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        guestLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
