import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./reducers/roleReducer.jsx";
import authReducer from "./reducers/authReducer.jsx"; // Import the new auth slice
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux";

// Persistence configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers (role and auth now)
const rootReducer = combineReducers({
  role: roleReducer,
  auth: authReducer,  // Add auth to combineReducers
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor to persist the store
export const persistor = persistStore(store);
