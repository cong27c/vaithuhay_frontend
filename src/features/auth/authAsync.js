import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/utils/httpRequest";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const res = await httpRequest.get("/auth/me");
    return res.data;
  }
);
