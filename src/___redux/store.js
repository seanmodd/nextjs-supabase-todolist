import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import mailSlice from './slices/mail';
import chatSlice from './slices/chat';
import blogSlice from './slices/blog';
import userSlice from './slices/user';
import productSlice from './slices/product';
import calendarSlice from './slices/calendar';
import kanbanSlice from './slices/kanban';

export const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [productSlice.name]: productSlice.reducer,
      [mailSlice.name]: mailSlice.reducer,
      // [kanbanSlice.name]: kanbanSlice.reducer,
      // [calendarSlice.name]: calendarSlice.reducer,
      // [blogSlice.name]: blogSlice.reducer,
      // [chatSlice.name]: chatSlice.reducer,
    },
    devTools: true,
  });

// export const fetchSubject = (id) => async (dispatch) => {
//   const timeoutPromise = (timeout) =>
//     new Promise((resolve) => setTimeout(resolve, timeout));

//   await timeoutPromise(200);

//   dispatch(
//     subjectSlice.actions.setEnt({
//       [id]: {
//         id,
//         name: `Subject ${id}`,
//       },
//     })
//   );
// };

export const wrapperStore = createWrapper(makeStore);
