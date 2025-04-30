// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logoutSuccess, setToken } from "~/features/auth/authSlice";

// let refreshTokenPromise = null;

// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://api01.f8team.dev/api",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithRefresh = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     if (!refreshTokenPromise) {
//       refreshTokenPromise = baseQuery(
//         {
//           url: "/auth/refresh-token",
//           method: "POST",
//           credentials: "include",
//         },
//         api,
//         extraOptions
//       );
//     }

//     const refreshResult = await refreshTokenPromise;
//     refreshTokenPromise = null;

//     if (refreshResult?.data?.accessToken) {
//       const newAccessToken = refreshResult.data.accessToken;
//       api.dispatch(setToken(newAccessToken));
//       await new Promise((resolve) => setTimeout(resolve, 0));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       const refreshToken = api.getState().auth.refreshToken;
//       if (!refreshToken) {
//         api.dispatch(logoutSuccess());
//         return result;
//       }
//     }
//   }

//   return result;
// };

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: baseQueryWithRefresh,
//   endpoints: (build) => ({
//     getCurrentUser: build.query({
//       query: () => "/auth/me",
//     }),
//     getCheckEmail: build.query({
//       query: (email) => ({
//         url: "/auth/check-email",
//         params: { email },
//       }),
//     }),
//     postUserRegister: build.mutation({
//       query: (payload) => ({
//         url: "/auth/register",
//         method: "POST",
//         body: payload,
//       }),
//     }),
//     postUserLogin: build.mutation({
//       query: (data) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     postUserLogout: build.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//     }),
//   }),
// });

// // Export hooks
// export const {
//   usePostUserRegisterMutation,
//   usePostUserLoginMutation,
//   usePostUserLogoutMutation,
//   useGetCheckEmailQuery,
//   useGetCurrentUserQuery,
// } = authApi;
