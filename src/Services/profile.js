import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api01.f8team.dev/api" }),
  endpoints: (build) => ({
    getCheckEmail: build.query({
      query: (email) => ({
        url: "/auth/check-email",
        params: { email },
      }),
    }),
    getUser: build.query({
      query: (username) => `/users/${username}`,
    }),
  }),
});

export const { useGetCheckEmailQuery, useGetUserQuery } = profileApi;
