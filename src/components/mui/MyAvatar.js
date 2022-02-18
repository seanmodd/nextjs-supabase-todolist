//* Account Avatar
// hooks
//* useAuth comes from Firebase
import { useEffect } from 'react';
import createAvatar from 'src/otherComponents/utils/createAvatar';
import useAuth from 'src/otherComponents/hooks/useAuth';
//
import { MAvatar } from './@material-extend';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <MAvatar
          src={user.photoURL}
          alt={user.displayName}
          color={
            user.photoURL ? 'default' : createAvatar(user.displayName).color
          }
          {...other}
        >
          {createAvatar(user.displayName).name}
        </MAvatar>
      )}
      {!isAuthenticated && (
        <MAvatar
          src="https://dmltrtcouncil.org/DMLTRTEXAMSYS/STUDENTPANEL/Image/College%20Login.jpg"
          // src="data:image/png;base64,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"
          // src="https://e7.pngegg.com/pngimages/773/422/png-clipart-question-mark-computer-icons-question-miscellaneous-blue.png"
          // src="https://banner2.cleanpng.com/20180329/xde/kisspng-computer-icons-question-mark-question-mark-5abc8df9d397b7.7019434615223065538667.jpg"
          // alt={user.displayName}
          // color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
          // {...other}
        >
          {/* {createAvatar(user.displayName).name} */}
        </MAvatar>
      )}
    </>
  );
}
