import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "setRole",
  initialState: {
    role: "blabla",
  },
  reducers: {
    setAdmin: (state) => {
      state.role = "Admin";
    },
    setsuperAdmin: (state) => {
      state.role = "superAdmin";
      console.log("admin set to superAdmin");
    },
  },
});

export const { setAdmin, setsuperAdmin } = roleSlice.actions;
export default roleSlice.reducer;
