import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileReducer from './profileSlice';
import educationReducer from './educationSlice';
import projectReducer from './projectSlice';
import experienceReducer from './experienceSlice';
import extraDetailsReducer from './extraDetailsSlice';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  profileDetails: profileReducer,
  educationDetails: educationReducer,
  projectDetails: projectReducer,
  experienceDetails: experienceReducer,
  extraDetails: extraDetailsReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
