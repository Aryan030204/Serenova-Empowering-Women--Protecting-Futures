import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Load user from localStorage when the app starts
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error loading user from localStorage", error);
    return null;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: { user: loadUserFromStorage() }, // Preload user state
  },
});

export default store;
