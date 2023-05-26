import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./setRole";
export default configureStore({
  reducer: {
    role: roleReducer,
  },
});
