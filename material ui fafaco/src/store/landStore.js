import { createSlice } from "@reduxjs/toolkit";

export const landSlice = createSlice({
  name: "land",
  initialState: {
    landData: [],
    selectedLand: {},
  },
  reducers: {
    createLand(state, action) {
      state.landData = [...state.landData, action.payload];
    },
    deleteLand(state, action) {
      state.landData = state.landData.filter(
        (item) => action.payload !== item.landId
      );
    },
    selectedRentalLand(state, action) {
      state.selectedLand = action.payload;
    },
    landLogout(state) {
      state.landData = [];
      state.selectedLand = {};
    },
  },
});

export const landActions = landSlice.actions;

export default landSlice.reducer;
