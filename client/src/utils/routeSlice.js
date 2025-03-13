import { createSlice } from "@reduxjs/toolkit";

const RouteSlice = createSlice({
  name: "route",
  initialState: {
    fromLat: "",
    toLat: "",
    fromLong: "",
    toLong: "",
  },
  reducers: {
    setFromLat: (state, action) => {
      state.fromLat = action.payload;
    },
    setToLat: (state, action) => {
      state.toLat = action.payload;
    },
    setFromLong: (state, action) => {
      state.fromLong = action.payload;
    },
    setToLong: (state, action) => {
      state.toLong = action.payload;
    },
  },
});

export const { 
  setFromLat, 
  setToLat, 
  setFromLong, 
  setToLong
 } = RouteSlice.actions;
export default RouteSlice.reducer;
