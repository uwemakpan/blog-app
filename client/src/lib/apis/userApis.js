import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCurrentUser } from '../redux/userSlice'
import { authApi } from './authApis'

const API_BASE_URL = 'https://blog-app-ev8z.onrender.com'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // endpoint 1
    getCurrentUser: builder.mutation({
      query: () => ({
        url: '/users/logged-in-user',
        method: 'GET',
        credentials: 'include',
      }),

      // this fxn is automatically called when query above is successful
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(setCurrentUser(data?.currentUser))
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),

    // endpoint 2
    getCurrentUser: builder.mutation({
      query: () => ({
        url: '/users/logged-in-user',
        method: 'GET',
        credentials: 'include',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(setCurrentUser(data?.currentUser))
          }
        } catch (error) {
          if (
            error?.error?.status === 401 ||
            error?.error?.data?.error === 'jwt expired'
          ) {
            dispatch(authApi.endpoints.getNewAccessToken.initiate())
          }
        }
      },
    }),
  }),
})

export const { useGetCurrentUserMutation } = userApi
