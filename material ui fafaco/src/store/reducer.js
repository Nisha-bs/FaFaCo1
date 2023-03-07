import { createSlice } from "@reduxjs/toolkit";

export const FarmerDetails = createSlice({
  name: "farmer",
  initialState: {
    farmer: [],
    farmername: "",
    farmer_id: "",
    editData: {},
    machine_detail: [],
    update_machine_detail: [],
    editMachineData: {},
    create: true,
    fullFarmer: [],
  },
  reducers: {
    create_farmer(state, action) {
      state.farmer = action.payload;
    },
    create_id(state, action) {
      state.farmer_id = action.payload;
    },
    create_name(state, action) {
      state.farmername = action.payload;
    },
    create_machine_detail(state, action) {
      state.machine_detail.push(action.payload);
    },
    up_machine_det(state, action) {
      state.update_machine_detail = action.payload;
    },
    edit_data(state, action) {
      state.editData = action.payload;
      state.create = false;
    },
    edit_machine_data(state, action) {
      state.editMachineData = action.payload;
      state.create = false;
    },
    farmerAll(state, action) {
      state.fullFarmer = action.payload;
    },
    farmerLogout(state) {
      state.farmer = [];
      state.farmername = "";
      state.farmer_id = "";
      state.editData = {};
      state.machine_detail = [];
      state.update_machine_detail = [];
      state.editMachineData = {};
      state.create = true;
      state.fullFarmer = [];
    },
  },
});

export const farmerActions = FarmerDetails.actions;

export default FarmerDetails.reducer;
