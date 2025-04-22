import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "~/Services/authServices";

export const getCurrentUser = createAsyncThunk("auth/get:user", async () => {
  const res = await authServices.getCurrentUser();

  return res;
});
