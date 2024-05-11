export const prepareBaseHeaders = (headers: Headers) => {
  // By default, if we have a token in the store, let's use that for authenticated requests
  const token = JSON.parse(localStorage.getItem("auth") as string);
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};
