import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';

export const apiHandler = createApi({
  reducerPath: 'apiHandler',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl.baseUrl }),
  endpoints: builder => ({
    LoginApi: builder.mutation({
      query: ({ url, data }) => {
        return {
          url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        };
      },
    }),
    ProfileApi: builder.mutation({
      query: ({ url, token }) => {
        return {
          url,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    GetApi: builder.mutation({
      query: ({ url, params, accessToken, idToken }) => {
        return {
          url: `${url}?${params}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Operation-Mode': 'SYNC',
            'org-token': idToken,
          },
        };
      },
    }),
    CreateApi: builder.mutation({
      query: ({ url, data, accessToken, idToken }) => {
        console.log('url', url);
        console.log('data', data);
        console.log('accessToken', accessToken);
        console.log('idToken', idToken);
        return {
          url,
          method: 'POST',
          body: data,
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Operation-Mode': 'SYNC',
            'org-token': idToken,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginApiMutation,
  useProfileApiMutation,
  useGetApiMutation,
  useCreateApiMutation,
} = apiHandler;
