import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
import { AppPaths, BASE_URL } from "../consts";
import { store } from "../../index";
import { userSlice } from "../../store/reducers/UserSlice";
import { router } from "../../routes/routes";

interface refreshResponse {
  access_token: string;
  refresh_token: string;
}

export const prepareBaseHeaders = (headers: Headers) => {
  // By default, if we have a token in the store, let's use that for authenticated requests
  const token = JSON.parse(localStorage.getItem("auth") as string);
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: prepareBaseHeaders,
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = retry(
  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const username = store.getState().user.username;
      const refresh_token = localStorage.getItem("refresh")?.slice(1, -1);
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh",
          method: "POST",
          body: { username, refresh_token: refresh_token },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { access_token, refresh_token } =
          refreshResult.data as refreshResponse;
        localStorage.setItem("auth", access_token);
        localStorage.setItem("refresh", refresh_token);
        // result = await baseQuery({ ...args }, api, extraOptions);
      } else {
        api.dispatch(userSlice.actions.removeUser());
        localStorage.clear();

        router.navigate(AppPaths.AUTH);
      }
    }
    return result;
  },
  {
    maxRetries: 1,
  },
);
