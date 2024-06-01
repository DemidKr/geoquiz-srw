import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
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
  const token = localStorage.getItem("auth");
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
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const username = store.getState().user.username;
    const refresh_token = localStorage.getItem("refresh");
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

    if (refreshResult?.data) {
      const { access_token, refresh_token } =
        refreshResult.data as refreshResponse;
      localStorage.setItem("auth", access_token);
      localStorage.setItem("refresh", refresh_token);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userSlice.actions.removeUser());
      localStorage.clear();

      router.navigate(AppPaths.AUTH);
    }
  }
  return result;
};
