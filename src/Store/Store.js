import { configureStore } from '@reduxjs/toolkit';
import reduxReducer from '../features/MailsCountSlice';
import importantCount from '../features/ImportantMailCount';
import getMailsReducer from '../features/getMailsSlice';

const store = configureStore({
  reducer: {
    mailCounts: reduxReducer,
    importantCount : importantCount,
    getMailsReducer : getMailsReducer
  },
});

export default store;
